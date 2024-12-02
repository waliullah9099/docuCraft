import Link from "next/link";

const Sidebar = ({ docs }) => {
  const roots = docs?.filter((doc) => !doc?.parent);

  const nonRoots = Object.groupBy(
    docs.filter((doc) => doc.parent),
    ({ parent }) => parent
  );

  console.log({ roots });

  return (
    <>
      <nav className="my-10 lg:block">
        <ul>
          <div className="relative pl-2 mt-3">
            <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
            <div className="absolute inset-y-0 w-px left-2 bg-zinc-900/10 dark:bg-white/5"></div>
            <div className="absolute w-px h-6 left-2 bg-emerald-500"></div>
            <ul role="list" className="border-l border-transparent">
              {roots.map((rootNode) => (
                <li key={rootNode?.id} className="relative">
                  <Link
                    aria-current="page"
                    className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition text-zinc-900 dark:text-white"
                    href={`/docs/${rootNode?.id}`}
                  >
                    <span className="truncate">{rootNode?.title}</span>
                  </Link>

                  {nonRoots[rootNode.id] && (
                    <ul role="list" className="border-l border-transparent">
                      {nonRoots[rootNode.id].map((subRoot) => (
                        <li key={subRoot.id}>
                          <Link
                            aria-current="page"
                            className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-900 dark:text-white"
                            href={`/docs/${rootNode?.id}/${subRoot?.id}`}
                          >
                            <span className="truncate">{subRoot?.title}</span>
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
    </>
  );
};

export default Sidebar;

{
  /* <ul role="list" className="border-l border-transparent">
  <li className="relative">
    <Link
      aria-current="page"
      className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition text-zinc-900 dark:text-white"
      href={`/`}
    >
      <span className="truncate">{"fklf"}</span>
    </Link>
    <ul role="list" className="border-l border-transparent">
      <li>
        <Link
          className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          href={`/`}
        >
          <span className="truncate">{"subRoot.title"}</span>
        </Link>
      </li>
    </ul>
  </li>
</ul>; */
}
