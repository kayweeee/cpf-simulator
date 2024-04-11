import { useState } from 'react';
import { useRouter } from "next/navigation";
import {Input, Dropdown, DropdownMenu, DropdownTrigger, Button, ButtonGroup, DropdownItem} from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export const getServerSideProps = async () => {
    // get all team schemes
    const res = await fetch("http://127.0.0.1:8000/scheme", { method: "GET" });
    const allSchemes = await res.json();
    return { props: {allSchemes} };
  };

export default function AddQuestions({allSchemes}){
    const [title, setTitle] = useState("");
    const [question_details, setDetails] = useState("");
    const [ideal, setIdeal] = useState("");
    const difficulty = ["Easy", "Medium","Difficult"];
    const [selectedDifficulty, setSelectedDifficulty] = useState(0);
    const router = useRouter();
    //should change name to GET method from schemes
    const name = allSchemes.map(scheme => scheme.scheme_name);
    const [selectedName, setSelectedName] = useState(0);

    async function addquestions(title, question_difficulty, question_details,ideal,scheme_name) {
        try {
          const response = await fetch("http://127.0.0.1:8000/question", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              question_difficulty : question_difficulty,
              question_details : question_details,
              ideal : ideal ,
              scheme_name : scheme_name,
            }),
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to add question");
          }
          // Handle response if necessary
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error adding question:", error);
          throw error;
        }
      }
    
      function handleSaveQuestion() {
        addquestions(title, difficulty[selectedDifficulty], question_details, ideal, name[selectedName]);
        // router.push("/index");
      }

    return (
        <div className='flex flex-col h-dvh'>
            <div className='flex flex-row '>
                <Button startContent={<IoIosArrowBack/>} className='flex items-center m-1 mx-5'>Back</Button>
            </div>


            <span className='text-2xl font-bold m-3'>Add Question</span>

            <div className="flex flex-col justify-flexstart items-center ml-0">
                <div className='flex flex-row md:flex-nowrap flex-wrap gap-10 px-1 m-2 '>
                    <span className='flex items-center '>Title </span>
                    <Input
                        isRequired
                        placeholder="Enter your Title"
                        defaultValue=""
                    onChange={(e) => setTitle(e.target.value)}
                        className="flex border border-sage-green outline-2 p-2 ml-0.5 w-48 ml-0" 
                    />
                </div>

                <ButtonGroup variant="flat" className="flex flex-wrap md:flex-nowrap gap-3 px-1 m-2 mr-1 items-center p-1 ml-2">
                    <Button>Difficulty </Button>
                    <div className='border border-sage-green p-2 mx-2 w-48 justify-end flex mr-4 '> 
                    <span className="flex w-full ml-2">
                        {difficulty[selectedDifficulty]}
                    </span>
                    <Dropdown>
                            <DropdownTrigger placement="bottom-end">
                                <Button isIconOnly className=' px-2 align-end'>
                                    <AiFillCaretDown />
                                </Button>
                            </DropdownTrigger>


                            <DropdownMenu
                               disallowEmptySelection
                               aria-label={difficulty[selectedDifficulty]}
                               selectedKey={[selectedDifficulty]}
                               selectionMode="single"
                               className="place-items-center block bg-light-green"
                             >
                                {difficulty.map((Difficulty, index) => (
                                    <DropdownItem
                                    className="p-1 hover:bg-white/50 outline-none rounded w-full"
                                    key={index}
                                    onAction={() => {
                                        setSelectedDifficulty(index);
                                        console.log("Selected option:", Difficulty); 
                                    }}
                                    >
                                {Difficulty}
                                </DropdownItem>
                                ))} 
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ButtonGroup>

                
                <ButtonGroup variant="flat" className="flex flex-wrap md:flex-nowrap gap-3 px-1 m-2 mr-1 items-center p-1 ml-2">
                    <Button>Scheme </Button>
                    <div className='border border-sage-green p-2 mx-2 w-48 justify-end flex '> 
                    <span className="flex w-full ml-2">
                        {name[selectedName]}
                    </span>
                        <Dropdown>
                            <DropdownTrigger placement="bottom-end">
                                <Button isIconOnly className=' px-2 align-end'>
                                    <AiFillCaretDown />
                                </Button>
                            </DropdownTrigger>


                            <DropdownMenu
                                disallowEmptySelection
                                aria-label={name[selectedName]}
                                selectedKey={[selectedName]}
                                selectionMode="single"
                                className="place-items-center block bg-light-green"

                            >
                                {name.map((Name, index) => (
                                <DropdownItem
                                className="p-1 hover:bg-white/50 outline-none rounded w-full"
                                key={index}
                                onAction={() => {setSelectedName(index);console.log("Selected option:", Name); }
                                }
                  >
                    {Name}
                                    </DropdownItem>
                                ))} 
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ButtonGroup>
                

    
                
                <div className='flex flex-row md:flex-nowrap flex-wrap gap-0.5 px-1 m-2  '>
                    <span className='flex items-center pr-3 '> Question </span>
                   <textarea
                    required={true}
                    id="ideal-question"
                    rows="4"
                   
                    // defaultValue=""
                    className="block p-2.5  ml-5 text-sm text-gray-900 text-wrap flex border p-1 h-[100px] w-[185px] md:w-[600px]
                        bg-gray-50 rounded-lg border border-sage-green focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your Question..." 
                        onChange={(e) => setDetails(e.target.value)}
                    > </textarea>
                    </div>
            
                <div className='flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2 p-1 mr-5'>
    <span className='flex items-center text-nowrap'>Ideal Answer</span>
    
        {/* <Input
            isRequired
            placeholder="Enter ideal answer"
            defaultValue=""
            // onValueChange={(value) => updateLogin(value)}
            className="flex-1 w-full h-full text-clip"
        /> */}
        <textarea
            required={true}
            // defaultValue=""
            id="ideal-answer"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 text-wrap flex border p-1 h-[200px] 
            w-[185px] md:w-[600px]
                 bg-gray-50 rounded-lg border border-sage-green focus:ring-blue-500 
                 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            placeholder="Enter your ideal answer..."
            onChange={(e) => setIdeal(e.target.value)}
  ></textarea>
    
</div>
                    <div className='flex flex-row md:flex-nowrap flex-wrap  px-1 m-2 p-1 ml-10 '>
                    <Button className='bg-dark-green p-1 px-2 rounded-lg text-white m-4 mb-20'>Cancel</Button>
                    <Button 
                    onClick={() => handleSaveQuestion()}
                    className='bg-dark-green p-1 px-4 rounded-lg text-white m-4  mb-20'>Save         
                    </Button>               
                    </div>
                </div>
            </div>
       
    );
}