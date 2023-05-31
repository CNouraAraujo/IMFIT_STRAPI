async function getData() {
  const response = await fetch('http://localhost:1337/api/exercicios');
  const data = await response.json();
  return data;
}

document.getElementById('dataForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const url = 'http://localhost:1337/api/exercicios';
  const nome = document.getElementById('nomeInput').value;
  const grupoMuscular = document.getElementById('grupoMuscularInput').value;

  const data = {
    nome: nome,
    grupoMuscular: grupoMuscular,
    img: null
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  };

  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);

      getData().then(updatedData => {

        console.log(updatedData);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
});

document.getElementById('deleteForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const url = 'http://localhost:1337/api/exercicios';
  const id = document.getElementById('idInput').value;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(`${url}/${id}`, options)
    .then(response => {
      if (response.ok) {
        console.log('Registro excluído com sucesso');

        getData().then(updatedData => {

          console.log(updatedData);
        });
      } else {
        console.error('Erro ao excluir o registro');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
});

async function getTable() {
  let table = await fetch('http://localhost:1337/api/exercicios');
  const data = await table.json()

  let tab = '';
  return data.exercicios.forEach(function (exercicio) {
    tab += `<tr>
      <td>${exercicio.id} </td>
      <td>${exercicio.nome} </td>
      <td>${exercicio.grupoMuscular} </td>
      </tr>`;

  });
  document.getElementById('tbody').innerHTML = tab;

  $('#userTable').DataTable({
    "data": data.exercicios,
    "columns": [
      { data: 'id' },
      { data: 'nome' },
      { data: 'grupoMuscular' }
    ]
  })
}
