type MyComponentProps<T> = {
  items: T[]
  defaultItem: T
}

function MyComponent<T>(props: MyComponentProps<T>) {
  console.log(props)
  return <p>some content</p>
}

const App = () => {
  const users: User[] = [
    { name: 'Bilbo', age: 111 },
    { name: 'Frodo', age: 33 },
  ]

  return (
    <>
      <MyComponent<string> items={['react', 'typescript']} defaultItem="default" />
      <MyComponent<User> items={users} defaultItem={{ name: 'Default User', age: 0 }} />
    </>
  )
}

type User = {
  name: string
  age: number
}
