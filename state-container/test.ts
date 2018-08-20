import { RootStateContainer } from './state-container';

const state = {
  users: [
    {
      name: 'A',
      age: 2
    },
    {
      name: 'B',
      age: 3
    }
  ],
  groups: [
    {
      name: 'Group A'
    },
    {
      name: 'Group B'
    }
  ]
}

export const container = new RootStateContainer(state)
container.watch('users', u => console.log(u.length))

const users = container.get('users')
console.log('Initial users: ', users)

const secondUser = container.select('users').get(1)
console.log('Second user: ', secondUser)

container
  .select('groups')
  .select(0)
  .watch(
    'name',
    name => console.log('First group name: ', name)
  )
