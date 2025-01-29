import { useEffect, useRef, useState } from 'react'

import './App.css'


type Card = {
   id : number,
   url : string,
   isClicked : boolean,
   isMatched : boolean,
}

type Img = {
  
}

function App() {

    

  const [data ,setData] = useState<string[]>([
   './../public/images/download (1).jpg',
     './../public/images/download (2).jpg',
     './../public/images/download (3).jpg', 
  ]);

  return (
    <>
      <>
       <h2 className='text-center text-2xl font-bold '> Typescipt Domination </h2>
       <CardGame data={data} setData={setData} />

      </>
    </>
  )
}



const CardGame = (prop : {data : string[] , setData : React.Dispatch<React.SetStateAction<string[]>>})=>{

   const ref : any = useRef(null);

   const [activeRef, setActiveRef] = useState<any[]>([]);

  const [data ,setData] = useState<Card[]>(() => 
     { const duplicated = [...prop.data, ...prop.data];  let arr : Card[] = duplicated.map((url, index)=>{
    return { id : index+1, url : url, isClicked : false, isMatched : false}
  }); return shuffleArray(arr) } );

  useEffect(() => {

    console.log("running");
    
    ()=>{

      console.log("running cleanup " , ref.current)
      if (ref.current) clearTimeout(ref.current);

    }
  }, [ref.current]);
const clickHandle =  (card : Card) => {
      
      if(card.isClicked || card.isMatched) return;

      card.isClicked = true;

      const clickedcards = data.reduce((acc , card) => {
        if(card.isClicked){
          acc = acc+1;
        }
        return acc;
      },0);

      if(clickedcards <= 2){
  setData((pre : Card[]) => { 
        let copy = [...pre];
        
        let ans = copy.map((cardc) => {
          if(cardc.id === card.id){

            return {...cardc,  isClicked : true};
          }
          return cardc;
        })

        return ans;
      });

      }

      ref.current = setTimeout(() => {
        console.log("running settimeout")
         if(clickedcards === 2){

       

        let twoCards = data.filter((cardc) => {
          return cardc.isClicked;
        })

        if(twoCards[0].url === twoCards[1].url){


          setData((pre : Card[]) => { 
            let copy = [...pre];
            
            let ans = copy.map((cardc) => {
              if(cardc.url === twoCards[0].url){
  
                return {...cardc,  isMatched : true};
              }
              return cardc;
            })
  
            return ans;
          });

         
        }

        

        
      

        setData((pre : Card[]) => { 
          let copy = [...pre];
          
          let ans = copy.map((cardc) => {
           
  
              return {...cardc,  isClicked : false};
            
           
          })
  
          return ans;
        });

      }
      }, 1000);

    
      console.log("running settimeout " , ref.current)


        
      
   
}
  return (
    <>
      <div className='grid grid-cols-4 gap-2'>
        {data.map((card) => 
             <div key={card.id} onClick={() => {clickHandle(card)}  } className='cursor-pointer h-32 w-32 bg-gray-500 rounded-xl  '>
              {
                    (card.isClicked || card.isMatched)  ?            <img src={card.url} alt="img" className='h-full w-full ' />  : ''

              }
             </div>
        )}
      </div>
    </>
  )
}

function shuffleArray(array : Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// const Card = (prop : Card) => {


export default App
