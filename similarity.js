/**
 * Asynchronously retrieves the vector embedding for a specific text input.
 *
 * Why:
 * This function is used to convert raw text into a numerical vector (embedding) using the
 * local Ollama API with the 'qwen3-embedding:0.6b' model. Embeddings are crucial for
 * performing semantic analysis, such as similarity search or clustering, as they represent
 * the meaning of the text in a high-dimensional space.
 *
 * @param {string} text - The text string to be embedded.
 * @returns {Promise<number[]|string|undefined>} The embedding vector, the status text if not OK, or undefined on error.
 */
const getEmbedding = async (text) => {
    try {
        const response = await fetch('http://localhost:11434/api/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                model: 'qwen3-embedding:0.6b',
                prompt: text,
            }),
        })

        if (response.statusText === 'OK') {
            const { embedding } = await response.json()
            return embedding
        } else {
            return response.statusText
        }
    } catch (err) {
        console.log(err.message)
    }
}

/**
 * Calculates the cosine similarity between two numerical vectors.
 *
 * Why:
 * This function is used to quantify the similarity between two text embeddings.
 * By calculating the cosine of the angle between the two vectors, we get a metric
 * where 1 means identical direction (highly similar), 0 means orthogonal (unrelated),
 * and -1 means opposite direction. This is standard for comparing semantic meaning
 * in vector space.
 *
 * @param {number[]} vectorA - The first vector.
 * @param {number[]} vectorB - The second vector.
 * @returns {number} The cosine similarity score (between -1 and 1).
 */
const cosineSimilarity = (vectorA, vectorB) => {
    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < vectorA.length; i++) {
        dotProduct += vectorA[i] * vectorB[i]
        normA += vectorA[i] ** 2
        normB += vectorB[i] ** 2
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}


/**
 * Computes the semantic similarity between two texts by getting their embeddings
 * and calculating the cosine similarity between them.
 *
 * @param {string} text1 - The first text string randomly taken from X
 * @param {string} text2 - The second text string randomly taken from X
 * @returns {Promise<number>} A promise that resolves to the cosine similarity score between the texts (between -1 and 1)
 */
const computeSimilarity = async (text1, text2) => {
    const embddd_1 = await getEmbedding(text1)
    const embddd_2 = await getEmbedding(text2)
    return cosineSimilarity(embddd_1, embddd_2)
}


const similarity = await computeSimilarity(
    '#PredatorBadlands feels like Avatar meets the MCU, turning the Predator into a full-on antihero — think Mad Max or Wolverine — AND IT WORKS! It’s a 90s-style, non-stop action adventure the entire runtime and never pushes any pencils, easily the best modern Predator sequel.',

    'An effective operation demonstrating what a skilled drone operator is capable of: clearing a building of Russian infantry from the inside without putting an entire unit of our own soldiers at risk Thanks to the outstanding team of SOF drone operators for sharing their work — together, we always supported them and will continue to do so on a regular basis.'
)

console.log(`Similarity: ${(similarity * 100).toFixed(2)}%`)
