import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";


async function toggleTodo(id: string, complete: boolean) {
  "use server"
  await prisma.todo.update({ where: { id }, data: { complete }})
}

export default async function Home() {
  
  // await prisma.todo.create({ data: { title: "test", complete: false }})
  const todos = await prisma.todo.findMany()
  
  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="/new"
          className="px-2 py-1 border rounded outline-none border-slate-300 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-700"
        >New</Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} toggleTodo={toggleTodo} {...todo} />
        ))}
      </ul>
    </>
  )
}
