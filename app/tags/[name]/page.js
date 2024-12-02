import ContentDisplay from "@/app/Components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByTag } from "@/utils/doc-utils";

const TagsPage = ({ params: { name } }) => {
  const docs = getDocuments();
  const matchedDocuments = getDocumentByTag(docs, name);

  return <ContentDisplay id={matchedDocuments[0].id} />;
};

export default TagsPage;
