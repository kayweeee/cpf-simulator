import { useState } from 'react';
import {Input, Dropdown, DropdownMenu, DropdownTrigger, Button, ButtonGroup, DropdownItem} from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export default function AddQuestions(){
    // console.log(schemes)
    // const [LoginId, setLoginId] = useState();
    // // const schemes = ["scheme 1", "scheme 2", "scheme 3"] # dummy data
    // const accessRights = ['member','admin']
    // const [selectedSchemeIndex, setSelectedSchemeIndex] = useState(0);
    // const [selectedAccessIndex, setSelectedAccessIndex] = useState(0);
    const exampleData = [
        {
          scheme_name: "Retirement",
          questions: 20,
          enabled: true,
        },
        {
          scheme_name: "Medisave",
          questions: 20,
          enabled: false,
        },
        {
          scheme_name: "Housing",
          questions: 20,
          enabled: false,
        },];
    function updateLogin(value){
        setLoginId(value)
        console.log(LoginId)
    }

    function handleSchemeSelection(schemeIndex) {
        setSelectedSchemeIndex(schemeIndex)
        console.log(schemeIndex)
    }

    function handleAccessSelection(accessIndex) {
        setSelectedAccessIndex(accessIndex)
        console.log(accessIndex)
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
                        // onValueChange={(value) => updateLogin(value)}
                        className="flex border border-sage-green outline-2 p-1 ml-0.5 w-48 ml-0" 
                    />
                </div>

                <div className='flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2 ml-0'>

                    <span className='flex items-center'>Difficulty </span>
                    <Input
                        isRequired
                        placeholder="Easy,Medium,Hard"
                        defaultValue=""
                        // onValueChange={(value) => updateLogin(value)}
                        className="flex border border-sage-green outline-2 p-1 w-48 " 
                    />
                </div>

                
                <ButtonGroup variant="flat" className="flex flex-wrap md:flex-nowrap gap-3 px-1 m-2 mr-1 items-center p-1 ml-2">
                    <Button>Scheme </Button>
                    <div className='border border-sage-green p-2 mx-2 w-48 justify-end flex '> 
                        {/* <span>{schemes[selectedSchemeIndex]}</span> */}
                        <Dropdown>
                            <DropdownTrigger placement="bottom-end">
                                <Button isIconOnly className=' px-2 align-end'>
                                    <AiFillCaretDown />
                                </Button>
                            </DropdownTrigger>


                            <DropdownMenu
                                disallowEmptySelection
                                // aria-label={scheme_name}
                                // selectedKey={[i]}
                                // selectionMode="single"
                                className='place-items-center block bg-light-green'

                            >
                                {exampleData.map((i) => (
                                    <DropdownItem className='p-1 m-1 hover:bg-white/50 outline-none rounded w-full' /*key={index} onAction={() => handleSchemeSelection(index)}*/>
                                        {i.scheme_name}
                                    </DropdownItem>
                                ))} 
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ButtonGroup>
                

    
                
                <div className='flex flex-row md:flex-nowrap flex-wrap gap-0.5 px-1 m-2  '>
                    <span className='flex items-center pr-3 '> Question </span>
                    {/* <Input
                        isRequired
                        placeholder="Enter Question"
                        defaultValue=""
                        // onValueChange={(value) => updateLogin(value)}
                        className="flex border border-sage-green outline-5 p-1 ml-4 h-[100px] w-[600px] overflow-x-auto" 
                    />
                </div> */}
                 <textarea
                    isRequired
                    id="ideal-question"
                    rows="4"
                   
                    // defaultValue=""
                    className="block p-2.5  ml-5 text-sm text-gray-900 text-wrap flex border p-1 h-[100px] w-[190px] md:w-[600px]
                        bg-gray-50 rounded-lg border border-sage-green focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your Question..." 
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
            isRequired
            // defaultValue=""
            id="ideal-answer"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 text-wrap flex border p-1 h-[200px] 
            w-[190px] md:w-[600px]
                 bg-gray-50 rounded-lg border border-sage-green focus:ring-blue-500 
                 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            placeholder="Enter your ideal answer..."
  ></textarea>
    
</div>
                    <div className='flex flex-row md:flex-nowrap flex-wrap  px-1 m-2 p-1 ml-10 '>
                    <Button className='bg-dark-green p-1 px-2 rounded-lg text-white m-4 mb-20'>Cancel</Button>
                    <Button className='bg-dark-green p-1 px-4 rounded-lg text-white m-4  mb-20'>Save</Button>
                    
                    
                   
                    </div>
                </div>
            </div>
       
    );
}