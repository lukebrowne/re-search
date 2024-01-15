import { Client, ClientOptions } from "@elastic/elasticsearch";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import {
    ElasticClientArgs,
    ElasticVectorSearch,
} from "@langchain/community/vectorstores/elasticsearch";
import { Document } from "@langchain/core/documents";

export async function embed(documents: Document[]) {
    const config: ClientOptions = {
        node: "http://127.0.0.1:9200",
    };

    const clientArgs: ElasticClientArgs = {
        client: new Client(config),
        indexName: "test_vectorstore",
    };

    const embeddings = new OllamaEmbeddings({
        model: "codellama",
        baseUrl: "http://localhost:11434",
    });

    console.log("Creating vector store");

    const vectorStore = new ElasticVectorSearch(embeddings, clientArgs);

    console.log("Embedding documents");

    const ids = await vectorStore.addDocuments(documents);

    console.log("Embedded documents", ids);

    return vectorStore.asRetriever({
        searchKwargs: { fetchK: 5 },
    });
}
