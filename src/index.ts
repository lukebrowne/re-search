import { load } from './load';
import { embed } from './embed';
import { chain } from './chain';

const REPO_PATH = "/Users/luke/code/mp-chisel/wizard-news/app";

async function main() {
    const docs = await load(REPO_PATH);

    console.log("Loaded", docs.length, "documents");

    const retriever = await embed(docs);

    console.log("Embedded documents");

    const questionAnswerer = await chain(retriever);

    console.log(await questionAnswerer.invoke({ question: "Where is the code for the hello page?" }));
}

main();
