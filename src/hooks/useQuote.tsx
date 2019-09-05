import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface IQuote {
  text: string;
  author: string;
  date: string;
}

const useQuote = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    const getQuote = async () => {
      try {
        let q = await getCachedQuote();
        if (!q) {
          q = await fetchQuote();
          AsyncStorage.setItem('quote', JSON.stringify(q));
        }
        setQuote({ text: q.text, author: q.author });
      } catch (error) {
        console.log(error);
      }
    };

    const getCachedQuote = async () => {
      try {
        const q = await AsyncStorage.getItem('quote');
        if (q !== null) {
          const { date, author, text }: IQuote = JSON.parse(q);
          const today = dayjs().format('YYYY-MM-DD');
          if (date === today) {
            return { author, text };
          }
        }
        return undefined;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchQuote = async () => {
      console.log('Fetch...');
      const res = await fetch('https://quotes.rest/qod?category=inspire', {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });
      const json = await res.json();
      const {
        contents: {
          quotes: [{ quote: text, author, date }]
        }
      } = json;
      return { text, author, date };
    };

    getQuote();
  }, []);

  return quote;
};

export default useQuote;
