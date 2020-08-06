import React from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number,
  name: string,
  avatar: string,
  whatsapp: number,
  bio: string,
  subject: string,
  cost: number,
};

interface TeacherItemProps {
  teacher: Teacher;
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Avatar"/>
        <div>
          <strong>{teacher.name}</strong>              
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a type="button" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} target="_blank">
          <img src={whatsappIcon} alt="WhatsApp"/>
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;