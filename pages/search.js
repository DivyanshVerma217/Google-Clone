import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Response from '../Response';
import SearchResults from '../components/SearchResults';
import {API_KEY, CONTEXT_KEY} from '../keys'

function Search({ results }) {
  const router = useRouter();
  

  return (
    <div>
      <Head>
        <title> {router.query.term} - Google Search </title>
        <link rel="icon" href="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"/>
      </Head>

      <Header />

      <SearchResults results={results} />

    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || '0';

  const data = useDummyData ? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}
  &cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`)
  .then((respose) => respose.json());
    
  return {
    props: {
      results: data,
    },
  }
}