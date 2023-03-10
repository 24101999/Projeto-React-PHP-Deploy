import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditDev.module.css";
const EditDev = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDesc] = useState("");
  const [dados, setDados] = useState("");
  let navgate = useNavigate();
  let param = useParams();
  let id = param.id;

  const url = `https://henriquedeveloper.com.br/PHP/admin/editdev.php?id=${id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setDados(res.data);
    });
  }, []);

  const edit = (e) => {
    e.preventDefault();

    axios.post(
      `https://henriquedeveloper.com.br/PHP/admin/updatedev.php?id=${id}`,
      {
        titulo,
        descricao,
      }
    );
    navgate("/admin");
  };

  return (
    <div className={styles.edit}>
      <h1>Editar</h1>
      <form onSubmit={edit}>
        <label>
          <input
            type="text"
            name="titulo"
            placeholder={dados ? dados[0].titulo : ""}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            name="descricao"
            placeholder={dados ? dados[0].descricao : ""}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <button>Editar</button>
      </form>
    </div>
  );
};

export default EditDev;
