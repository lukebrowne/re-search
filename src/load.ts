import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function load(repo: string) {
    const loader = new DirectoryLoader(repo, {
        ".ts": (path) => new TextLoader(path),
        ".tsx": (path) => new TextLoader(path),
    });

    const docs = await loader.load();

    const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
        chunkSize: 2000,
        chunkOverlap: 200,
    });

    const texts = await javascriptSplitter.splitDocuments(docs);

    return texts;
}
