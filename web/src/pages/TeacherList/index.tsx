import React, { useState, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList() {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select name="subject" label="Matéria" value={subject}
          onChange={(event) => { setSubject(event.target.value) }} options={[
            { value: 'Javascript', label: 'Javascript' },
            { value: 'Java', label: 'Java' },
            { value: 'C#', label: 'C#' },
            { value: 'VueJs', label: 'VueJs' },
            { value: 'React Native', label: 'React Native' },
          ]} />
          <Select name="weekday" label="Dia da Semana" value={week_day}
            onChange={(event) => { setWeekday(event.target.value) }} options={[
            { value: '0', label: 'Domingo' },
            { value: '1', label: 'Segunda - Feira' },
            { value: '2', label: 'Terça - Feira' },
            { value: '3', label: 'Quarta - Feira' },
            { value: '4', label: 'Quinta - Feira' },
            { value: '5', label: 'Sexta - Feira' },
            { value: '6', label: 'Sábado' },
          ]} />
          <Input type="time" name="time" label="Hora" value={time}
            onChange={(event) => { setTime(event.target.value) }} />

            <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        { teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        }) }
      </main>
    </div>
  );
}

export default TeacherList;
