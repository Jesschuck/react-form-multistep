// Components
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {FiSend} from 'react-icons/fi'
import UserForm from './components/UserForm';
import ReviewForm from './components/ReviewForm';
import Thanks from './components/Thanks';
import Steps from './components/Steps';

// Hooks
import { useForm } from './hooks/useForm';
import { useState } from 'react';

import './App.css';

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
};

function App() {
  const [data, setData] = useState(formTemplate);

  const updatedFieldHandler = (key, value) => {
    setData((prev) => {
      return {...prev, [key]: value};
    });
  };

  const formComponents = [
  <UserForm key={'form-1'} data={data} updatedFieldHandler={updatedFieldHandler} />, 
  <ReviewForm key={'form-2'} data={data} updatedFieldHandler={updatedFieldHandler} />, 
  <Thanks key={'form-3'} data={data} />,
];
  
  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents);

  return (
    <div className='app'>
      <div className="header">
        <h2>Deixe a sua avaliação</h2>
        <p>Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto.</p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />
              <span>Voltar</span>
            </button>
            )}
            {!isLastStep ? (
               <button type='submit'>
               <span>Avançar</span>
               <GrFormNext />
             </button>
            ) : (
              <button type='button'>
              <span>Enviar</span>
              <FiSend />
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
