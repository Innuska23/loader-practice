import { DecksList } from './DecksList/DecksList.tsx'
import { AddNewDeckForm } from './AddNewDeckForm/AddNewDeckForm.tsx'

export const Decks = () => {
  return (
    <div>
      <h1>Decks 🐈</h1>
      <AddNewDeckForm />
      <DecksList />
      <footer>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora sequi accusamus, perferendis obcaecati enim. In numquam veniam nam temporibus quam officiis ratione eaque! Quo labore quas voluptatibus quam fugiat.</footer>
    </div>
  )
}
