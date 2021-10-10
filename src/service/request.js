class Request {
  constructor() {
    this.host = 'https://reactmarathon-api.herokuapp.com/api'
    this.host2 = 'https://reactmarathon-api.netlify.app/api'
  }

  getStarterKit = async () => {
    return await fetch(`${this.host}/pokemons/starter`).then(res => res.json())
  }

  getBoard = async () => {
    return await fetch(`${this.host2}/board`).then(res => res.json())
  }

  createPlayer = async () => {
    return await fetch(`${this.host2}/create-player`).then(res => res.json())
  }

  gameStart = async (data) => {
    console.log("###data", data);
    return await fetch(`${this.host}/pokemons/game/start`,{
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  game = async (data) => {
    return await fetch(`${this.host}/pokemons/game`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(res => res.json())
  }
}

const request = new Request()

export default request;
