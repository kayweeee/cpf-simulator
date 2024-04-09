import { useState } from 'react';
import {Input, Dropdown, DropdownMenu, DropdownTrigger, Button, ButtonGroup, DropdownItem} from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export const getStaticProps= (async (context) => {
    // Fetch data from external API
    const res = await fetch('http://127.0.0.1:8000/scheme')
    const schemes = await res.json()
    // Pass data to the page via props
    return { props: {schemes} }
  })

export default function AddProfile(schemes){
    const schemeNames = schemes['schemes']
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const accessRights = ['member','admin']
    const [selectedSchemeIndex, setSelectedSchemeIndex] = useState(0);
    const [selectedAccessIndex, setSelectedAccessIndex] = useState(0);

    async function addUser (email, access_rights, name) {

        try {
            const response = await fetch('http://127.0.0.1:8000/user', {
                method: 'POST',
                body: JSON.stringify({email: email, access_rights: access_rights, name: name}),
                headers:{
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            console.log(response)

            if (!response.ok) {
                throw new Error("Failed to create user");
            }
            // Handle response if necessary
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
    
    function updateEmail(value){
        setEmail(value)
        console.log(email)
    }
    function updateName(value){
        setName(value)
        console.log(name)
    }

    function handleSchemeSelection(schemeIndex) {
        setSelectedSchemeIndex(schemeIndex)
        console.log(schemeIndex)
    }

    function handleAccessSelection(accessIndex) {
        setSelectedAccessIndex(accessIndex)
        console.log(accessIndex)
    }

    function handleSaveProfile() {
        addUser(email, accessRights[selectedAccessIndex], name)
    }
    return (
        <div className='flex flex-col h-dvh'>
            <div className='flex flex-row'>
                <Button startContent={<IoIosArrowBack/>} className='flex items-center m-1 mx-3'>Back</Button>
            </div>
            <span className='text-2xl font-bold m-3'>Add Profile</span>
            <div className='flex flex-col justify-evenly'>
                <div className="flex flex-col justify-stretch items-center">
                    <div className='flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2 items-center'>
                        <span className='flex w-1/4'>Email:</span>
                        <Input
                            isRequired
                            type="email"
                            placeholder="Enter your email"
                            defaultValue=""
                            onValueChange={(value) => updateEmail(value)}
                            className="flex border border-sage-green outline-2 py-1 w-48"
                        />
                    </div>
                    <div className='flex flex-row md:flex-nowrap flex-wrap gap-4 m-2 items-center'>
                        <span className='flex w-1/4'>Name: </span>
                        <Input
                            isRequired
                            placeholder="Enter your Name"
                            defaultValue=""
                            onValueChange={(value) => updateName(value)}
                            className="flex border border-sage-green outline-2 py-1 w-48"
                        />
                    </div>

                    <ButtonGroup variant="flat" className="flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2 items-center">
                        <Button>Scheme: </Button>
                        <div className='border border-sage-green p-1 m-2 w-48 justify-between flex '> 
                            <span className='flex w-1/4'>{schemeNames[selectedSchemeIndex]}</span>
                            <Dropdown>
                                <DropdownTrigger placement="bottom-end">
                                    <Button isIconOnly className='px-2'>
                                        <AiFillCaretDown />
                                    </Button>
                                </DropdownTrigger>


                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label={schemeNames[selectedSchemeIndex]}
                                    selectedKey={[selectedSchemeIndex]}
                                    selectionMode="single"
                                    className='place-items-center block bg-light-green'
                                >
                                {schemeNames.map((scheme, index) => (
                                    <DropdownItem className='p-1 m-1 hover:bg-white/50 outline-none rounded w-full' key={index} onAction={() => handleSchemeSelection(index)}>
                                        {scheme}
                                    </DropdownItem>
                                ))}

                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </ButtonGroup>

                    <ButtonGroup variant="flat" className="flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2 items-center"> {/* Ensured all items are centered */}
                        <Button>Access:</Button>
                        <div className='border border-sage-green p-1 m-2 w-48 justify-between flex '> {/* Adjusted styles for centered items */}
                            <span className='flex w-1/4'>{accessRights[selectedAccessIndex]}</span>
                            <Dropdown>
                                <DropdownTrigger placement="bottom-end">
                                    <Button isIconOnly className='px-2'>
                                        <AiFillCaretDown />
                                    </Button>
                                </DropdownTrigger>


                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label={accessRights[selectedAccessIndex]}
                                    selectedKey={[selectedAccessIndex]}
                                    selectionMode="single"
                                    className='place-items-center block bg-light-green'

                                >
                                    {accessRights.map((access, index) => (
                                        <DropdownItem className='p-1 m-1 hover:bg-white/50 outline-none rounded w-full' key={index} onAction={() => handleAccessSelection(index)}>
                                            {access}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </ButtonGroup>
                </div>

                <div className='flex justify-center items-end'>
                        <Button className='bg-dark-green p-1 px-2 rounded-lg text-white m-4' >Cancel</Button>
                        <Button className='bg-dark-green p-1 px-4 rounded-lg text-white m-4' 
                        onClick={()=> handleSaveProfile()}
                        >Save</Button>
                </div>

            </div>
        </div>
    );
}