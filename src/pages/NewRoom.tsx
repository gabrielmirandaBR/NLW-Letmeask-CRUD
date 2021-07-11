import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function NewRoom() {

  const [newRoom, setNewRoom] = useState(''); // seta estado do input
  const { user } = useAuth();
  const  history  = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') { //trim remove espaço entre a direita e esquerda. Se o numero da sala for vazio, a função retorna 
      return; 
    }

    const roomRef = database.ref('rooms'); // dentro do banco de dados haverá uma categoria chamada rooms que poderá ser acrescentado dados


    const firebaseRoom = await roomRef.push({ // irá acrescentar informação ao banco de dados
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`); // redireciona para a sala com /rooms/id do usuario no firebase
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logoImg } alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={ handleCreateRoom } >
            <input 
              type="text" 
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={ newRoom }
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}