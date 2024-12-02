"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getDocumentByAuthor,
  getDocumentByCategory,
  getDocumentByTag,
} from "@/utils/doc-utils";

const Sidebar = ({ docs }) => {
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

  useEffect(() => {
    let matchedDocs = docs;

    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocumentByTag(docs, tag);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocumentByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocumentByCategory(docs, category);
    }

    const roots = matchedDocs.filter((post) => !post.parent);

    const nonRoots = Object.groupBy(
      matchedDocs.filter((post) => post.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRoots);
    nonRootsKeys.forEach((key) => {
      const foundedInRoots = roots.find((root) => root.id === key);

      if (!foundedInRoots) {
        const foundDocs = docs.find((doc) => doc.id === key);

        roots.push(foundDocs);
      }
    });

    // const nonRootsKeys = Reflect.ownKeys(nonRoots);
    // nonRootsKeys.forEach((key) => {
    //   const foundInRoots = roots.find((root) => root.id === key);
    //   if (!foundInRoots) {
    //     const foundInDocs = docs.find((doc) => doc.id === key);
    //     roots.push(foundInDocs);
    //   }
    // });

    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRootNodes([...roots]);
    setNonRootNodesGrouped({ ...nonRoots });
  }, [pathName]);

  return (
    <nav className="my-10 lg:block">
      <ul>
        <div className="relative pl-2 mt-3">
          <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
          <div className="absolute inset-y-0 w-px left-2 bg-zinc-900/10 dark:bg-white/5"></div>
          <div className="absolute w-px h-6 left-2 bg-emerald-500"></div>
          <ul role="list" className="border-l border-transparent">
            {rootNodes.map((rootNode) => (
              <li key={rootNode.id} className="relative">
                <Link
                  aria-current="page"
                  className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition text-zinc-900 dark:text-white"
                  href={`/docs/${rootNode.id}`}
                >
                  <span className="truncate">{rootNode.title}</span>
                </Link>
                {nonRootNodesGrouped[rootNode.id] && (
                  <ul role="list" className="border-l border-transparent">
                    {nonRootNodesGrouped[rootNode.id].map((subRoot) => (
                      <li key={subRoot.id}>
                        <Link
                          className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          href={`/docs/${rootNode.id}/${subRoot.id}`}
                        >
                          <span className="truncate">{subRoot.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
