import { FaSearch } from "react-icons/fa";
import './style.css';
import { useState } from "react";
import api from './services/api'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  async function requestToGetCEP(){
    if(input === ''){
      alert('Por favor, digite um CEP!');
      return;
    }

    if(input.length < 9){
      alert('Por favor, digte todos os numeros do CEP');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
      setButtonDisabled(true);
      if(response.data.erro){
        alert('Por favor, digite um CEP válido!');
        return;
      }
    
    } catch{
      alert('Algo deu errado!');
    }
  }
  
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Buscador de CEP</h1>

        <div className="search-container">
          <input 
          type="text" 
          placeholder="Digite o CEP..." 
          id="buscador-cep"
          maxLength={8}
          value={input}
          onChange={(e) => {             
            const { value } = e.target;
            setInput(value.replace(/\D/g, ''));
            setButtonDisabled(true);

            if(value.match(/\D/g)){
              return;
            }
            
            if(value.length === 8 && !value.includes('-')){
              setInput(value.replace(/\D/g, ''));
              let inputValue = value.match(/(\d{5})(\d{3})/);
              inputValue = `${inputValue[1]}-${inputValue[2]}`;
              setInput(inputValue);
              setButtonDisabled(false);
            } else if(value.length >= 8 && value.includes('-')){
                setInput(value.replace('-', ''));
            }
            }
          }
          >
          </input>
          <button 
          className={`search-button ${isButtonDisabled ? 'disabled' : 'enabled'}`} 
          id="search-button-id"
          disabled={isButtonDisabled}
          >
          <FaSearch size={20} color="#fff" onClick={requestToGetCEP}/>
          </button>
        </div>

      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>{cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>DDD: {cep.ddd}</span>
     </main>
     )}
     </div>
  </div>
    
    
  );
}

export default App;
