import Question from "./models/Question.js";
import { IQuestion } from "./interfaces/IQuestion.js";


// Define the shape of a single question from the OpenTDB API
interface IOpenTDBQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// Define the full API response shape
interface IOpenTDBResponse {
  response_code: number;
  results: IOpenTDBQuestion[];
}

async function fetchAndSaveQuestions(category_id: number, difficulty: string): Promise<boolean> {  
  
  try {
    const url = `https://opentdb.com/api.php?amount=10&category=${category_id}&difficulty=${difficulty}&type=multiple`;
    console.log(`fetching: ${url}`)
    
    const response = await fetch(url);
    const result = (await response.json()) as IOpenTDBResponse;

    if (result.results && result.results.length > 0) {
      console.log(`Saving ${result.results.length} questions for category ${category_id}, difficulty ${difficulty}`);

      const savePromises = result.results.map((item: IOpenTDBQuestion) => {
        const question = new Question({
          category_id: category_id,
          category_name: item.category,
          difficulty: item.difficulty,
          question: item.question,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,
        });

        return question.save();
      });

      await Promise.all(savePromises);
      console.log(`Completed saving questions for category ${category_id}, difficulty ${difficulty}`);
      return true
    } else {
      console.log(`No results for category ${category_id}, difficulty ${difficulty}`);
      return false
    }
  } catch (err: any) {
    console.error(`Error fetching/saving category ${category_id}, difficulty ${difficulty}:`, err.message);
    return false
  }
}

const populateDatabase = async () => {
  const categories = [10, 11, 12, 17, 23];
  const difficulties = ['easy', 'medium', 'hard'];

  for (const category_id of categories) {
    for (const difficulty of difficulties) {
      let success = false
      let counter = 0
      while (!success && counter < 6) {
        counter++
        console.log(`Processing category ${category_id}, difficulty ${difficulty}`);
        success = await fetchAndSaveQuestions(category_id, difficulty);

        console.log('Waiting 5 seconds before next request...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  console.log('Database population completed!');
}

export default populateDatabase

