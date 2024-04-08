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
    console.log(schemes['schemes'])
    const schemeNames = schemes['schemes']
    const [LoginId, setLoginId] = useState();
    // const schemes = ["scheme 1", "scheme 2", "scheme 3"] # dummy data
    const accessRights = ['member','admin']
    const [selectedSchemeIndex, setSelectedSchemeIndex] = useState(0);
    const [selectedAccessIndex, setSelectedAccessIndex] = useState(0);

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
            <div className='flex flex-row'>
                <Button startContent={<IoIosArrowBack/>} className='flex items-center m-1 mx-3'>Back</Button>
            </div>


            <span className='text-2xl font-bold m-3'>Add Profile</span>

            <div className="flex flex-col justify-center items-center">
                <div className='flex flex-row md:flex-nowrap flex-wrap gap-4 px-1 m-2'>
                    <span className='flex items-center'>Login Id: </span>
                    <Input
                        isRequired
                        placeholder="Enter your login ID"
                        defaultValue=""
                        onValueChange={(value) => updateLogin(value)}
                        className="flex border border-sage-green outline-2 p-1 w-48" // Adjusted height to be full
                    />
                </div>

                <ButtonGroup variant="flat" className="flex flex-wrap md:flex-nowrap gap-4 px-1 m-2 items-center"> {/* Ensured all items are centered */}
                    <Button>Scheme: </Button>
                    <div className='border border-sage-green p-2 mx-2 w-48 justify-between flex '> {/* Adjusted styles for centered items */}
                        <span>{schemeNames[selectedSchemeIndex]}</span>
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
                <ButtonGroup variant="flat" className="flex flex-wrap md:flex-nowrap gap-4 px-1 m-2 items-center"> {/* Ensured all items are centered */}
                    <Button>Access:    </Button>
                    <div className='border border-sage-green p-2 mx-2 w-48 justify-between flex items-center'> {/* Adjusted styles for centered items */}
                        <span>{accessRights[selectedAccessIndex]}</span>
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

                <div className='justify-between items-end'>
                    <Button className='bg-dark-green p-1 px-2 rounded-lg text-white m-4'>Cancel</Button>
                    <Button className='bg-dark-green p-1 px-4 rounded-lg text-white m-4 '>Save</Button>
                </div>
            </div>
        </div>
    );
}