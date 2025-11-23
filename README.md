# Similarity

A Node.js application that computes semantic similarity between two text strings using vector embeddings and cosine similarity.

## Description

This project calculates how semantically similar two pieces of text are by:
1. Converting each text into a numerical vector (embedding) using the Ollama API with the 'qwen3-embedding:0.6b' model
2. Computing the cosine similarity between these two vectors
3. Returning a similarity score between -1 and 1, where:
   - 1 means identical direction (highly similar)
   - 0 means orthogonal (unrelated)
   - -1 means opposite direction

## Prerequisites

- Node.js (v14 or higher)
- Ollama API running locally on port 11434
- Access to the 'qwen3-embedding:0.6b' model in Ollama

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Similarity
   ```

3. Install dependencies (if any):
   ```
   npm install
   ```

## Usage

To run the application:
```
npm run dev
```

This will execute the similarity computation between two sample texts and display the result as a percentage.

### Functions

#### `getEmbedding(text)`
Asynchronously retrieves the vector embedding for a specific text input using the Ollama API.

Parameters:
- `text` (string): The text string to be embedded.

Returns:
- `Promise<number[]>`: The embedding vector.

#### `cosineSimilarity(vectorA, vectorB)`
Calculates the cosine similarity between two numerical vectors.

Parameters:
- `vectorA` (number[]): The first vector.
- `vectorB` (number[]): The second vector.

Returns:
- `number`: The cosine similarity score (between -1 and 1).

#### `computeSimilarity(text1, text2)`
Computes the semantic similarity between two texts by getting their embeddings and calculating the cosine similarity between them.

Parameters:
- `text1` (string): The first text string.
- `text2` (string): The second text string.

Returns:
- `Promise<number>`: A promise that resolves to the cosine similarity score between the texts (between -1 and 1).

## Example Output

The application will output the similarity score as a percentage. For example:
```
Similarity: 42.35%
```

## How It Works

1. Two sample texts are processed through the `computeSimilarity` function
2. Each text is converted to a vector embedding using the Ollama API
3. The cosine similarity between these vectors is calculated
4. The result is displayed as a percentage

## License

This project is licensed under the ISC License.