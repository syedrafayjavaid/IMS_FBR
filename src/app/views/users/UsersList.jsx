import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
// material
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/styles'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import config from 'config'
import UsersCard from './UsersCard'

import SummarizeIcon from '@mui/icons-material/Summarize'
import { CSVLink } from 'react-csv'
import './user.css'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))
const UsersList = () => {
    const [personName, setPersonName] = React.useState([])
    const [brandName, setBrandName] = React.useState([])

    const [users, setUsers] = React.useState([])
    const [image, setImage] = React.useState('')
    //const [designation, setDesignation] = React.useState('')
    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [userId, setUserId] = React.useState('')
    const [createEmployeeDialog, setCreateEmployeeDialog] =
        React.useState(false)
    const [editEmployeeDialog, setEditEmployeeDialog] = React.useState(false)
    const date = new Date().toISOString().split('T')[0]
    const [name, setName] = React.useState('')
    const [nameError, setNameError] = React.useState(false)
    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState(null)
    const [description, setDescription] = React.useState('')
    const [descriptionError, setDescriptionError] = React.useState(false)
    const [cnic, setCnic] = React.useState('')
    const [cnicError, setCnicError] = React.useState(false)
    const [employeeId, setEmployeeId] = React.useState('')
    const [employeeIdError, setEmployeeIdError] = React.useState(false)
    //  const [checked, setChecked] = React.useState([])
    const [office, setOffice] = React.useState([])
    const [officeName, setOfficeName] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null)
    // const open1 = Boolean(anchorEl)
    const [anchorEl1, setAnchorEl1] = React.useState(null)
    const open2 = Boolean(anchorEl1)
    const [addDepartment, setAddDepartment] = React.useState('')
    const [addDepartmentarr, setAddDepartmentarr] = React.useState([])
    /////// employee dialoge
    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const label = { inputProps: { 'aria-label': 'Switch demo' } }
    ///////

    const [mobileNumber1, setMobileNumber1] = React.useState('')
    const [mobilenumber1Error, setMobileNumber1Error] = React.useState(false)
    // const [remarks1,setRemarks1]= React.useState('')
    // const [remarks1Error,setRemarks1Error]= React.useState(false)
    const [emailAddress1, setEmailAddress1] = React.useState('')
    const [emailAddress1Error, setEmailAddress1Error] = React.useState(false)
    const [placeOfPosting1, setPlaceOfPosting1] = React.useState([])
    const [placeOfPosting1Name, setPlaceOfPosting1Name] = React.useState('')
    // const [placeOfPosting1Error,setPlaceOfPosting1Error]= React.useState(false)
    const [pg1, setPg1] = React.useState('')
    const [pg1Error, setPg1Error] = React.useState(false)
    const [wing1, setWing1] = React.useState('')
    const [wing1Error, setWing1Error] = React.useState(false)
    const [department1, setDepartment1] = React.useState('')

    const [department1Error, setDepartment1Error] = React.useState(false)
    const [dateOfJoinnig1, setDateOfJoinnig1] = React.useState(date)
    const [dateOfJoinnig1Error, setDateOfJoinnig1Error] = React.useState(false)
    const [designation1, setDesignation1] = React.useState('')
    const [designationError, setDesignationError] = React.useState(false)

    ///error Handling
    const [designation1Error, setDesignation1Error] = React.useState(false)
    const [reportManagError, setReportManagError] = React.useState(false)
    const [departmentError, setDepartmentError] = React.useState(false)

    ///Search filters state
    const [sdynamic, setDynamic] = React.useState('')
    const [sdesignation, setSdesignation] = React.useState()
    const [sreportingManager, setSreportingManager] = React.useState('')
    const [sdepartment, setSdepartment] = React.useState()
    const [sdate, setSdate] = React.useState('')
    const [sdate1, setSdate1] = React.useState('')
    const [sOffice, setSOffice] = React.useState()

    const [designations, setDesignations] = React.useState([])
    const [departments, setDepartments] = React.useState([])

    ////pagination code set here

    const [pageNumber, setPageNumber] = React.useState(0)
    const usersPerPage = 8
    const pagesVisited = pageNumber * usersPerPage
    const pageCount = Math.ceil(users.length / usersPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const [open5, setOpen5] = React.useState(false)

    const handlePlaceOfJoining = (event) => {
        setPlaceOfPosting1Name(event.target.value)
    }

    const Input = styled('input')({
        display: 'none',
    })

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setDepartments(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setPlaceOfPosting1(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .post(`${config.base_url}/api/v1/employee/designationSuggestions`)
            .then((res) => {
                setDesignations(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleCreateClose = () => {
        setCreateEmployeeDialog(false)
        setName('')
        // setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        // setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        // setChecked(true)
        // setMobileNumber(false)
        // setDateOfJoining(false)
        // setDepartment(false)
        // setWing(false)
        // setPg(false)
        // setDesgnation(false)
        // setEmailAdress(false)
        // setRemark(false)
        // setPlaceOfPoset(false)
        setMobileNumber1('')
        setMobileNumber1Error(false)
        // setRemarks1('')
        // setRemarks1Error(false)
        setEmailAddress1('')
        setEmailAddress1Error(false)
        setPlaceOfPosting1Name('')
        // setPlaceOfPosting1('')
        // setPlaceOfPosting1Error(false)
        setPg1('')
        setPg1Error(false)
        setWing1('')
        setWing1Error(false)
        setDepartment1('')
        setDepartment1Error(false)
        setDesignation1('')
        setDesignation1Error(false)
        setDateOfJoinnig1(date)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEditClose = () => {
        setEditEmployeeDialog(false)
        setName('')
        // setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        // setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        // setChecked(true)

        setPlaceOfPosting1Name('')
        setMobileNumber1('')
        setMobileNumber1Error(false)
        // setRemarks1('')
        // setRemarks1Error(false)
        setEmailAddress1('')
        setEmailAddress1Error(false)
        // setPlaceOfPosting1('')
        // setPlaceOfPosting1Error(false)
        setPg1('')
        setPg1Error(false)
        setWing1('')
        setWing1Error(false)
        setDepartment1('')
        setDepartment1Error(false)
        setDesignation1('')
        setDesignation1Error(false)
        setDateOfJoinnig1(date)
    }

    const handleEditSnackBarClose = () => {
        setEditSnackBar(false)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleCreateClickOpen = () => {
        if (
            name === '' ||
            cnic === '' ||
            description === '' ||
            employeeId === '' ||
            mobileNumber1 === '' ||
            emailAddress1 === '' ||
            pg1 === '' ||
            // wing1 === '' ||
            addDepartment === '' ||
            designation1 === ''
        ) {
            if (name === '') {
                setNameError(true)
            }
            if (cnic === '') {
                setCnicError(true)
            }
            if (description === '') {
                setDescriptionError(true)
            }
            if (employeeId === '') {
                setEmployeeIdError(true)
            }
            if (mobileNumber1 === '') {
                setMobileNumber1Error(true)
            }
            if (emailAddress1 === '') {
                setEmailAddress1Error(true)
            }
            if (pg1 === '') {
                setPg1Error(true)
            }
            // if (wing1 === '') {
            //     setWing1Error(true)
            // }
            if (addDepartment === '') {
                setDepartment1Error(true)
            }
            if (designation1 === '') {
                setDesignation1Error(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        if (
            name === '' ||
            cnic === '' ||
            description === '' ||
            employeeId === '' ||
            mobileNumber1 === '' ||
            emailAddress1 === '' ||
            pg1 === '' ||
            wing1 === '' ||
            department1 === '' ||
            designation1 === ''
        ) {
            if (name === '') {
                setNameError(true)
            }
            if (cnic === '') {
                setCnicError(true)
            }
            if (description === '') {
                setDescriptionError(true)
            }
            if (employeeId === '') {
                setEmployeeIdError(true)
            }
            if (mobileNumber1 === '') {
                setMobileNumber1Error(true)
            }
            if (emailAddress1 === '') {
                setEmailAddress1Error(true)
            }
            if (pg1 === '') {
                setPg1Error(true)
            }
            if (wing1 === '') {
                setWing1Error(true)
            }
            if (department1 === '') {
                setDepartment1Error(true)
            }
            if (designation1 === '') {
                setDesignation1Error(true)
            }
        } else {
            editHandler()
        }
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', name)
        data.append('photo', image)
        // data.append('office', office)
        data.append('cnic', cnic)
        data.append('remarks', description)
        data.append('employeeId', employeeId)
        // data.append('purchasedItems', checked)

        data.append('mobileNumber', mobileNumber1)
        data.append('placeOfPosting', placeOfPosting1Name)
        // data.append('remarks', remarks1)
        data.append('dateOfJoining', dateOfJoinnig1)
        data.append('wing', wing1)
        data.append('pg', pg1)
        // data.append('department', department1)
        data.append('department', addDepartment)
        data.append('designation', designation1)
        data.append('emailAddress', emailAddress1)

        const userNameExist = users.find((user) => {
            return user.employeeId === employeeId
        })

        if (userNameExist) {
            setCreateSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }

                setName('')
                // setOffice('')
                setCnic('')
                setEmployeeId('')
                setDescription('')
                setImage('')
                setMobileNumber1('')
                // setRemarks1('')
                setEmailAddress1('')
                // setPlaceOfPosting1('')
                setPg1('')
                setWing1('')
                setDepartment1('')
                setAddDepartment('')
                setDesignation1('')
                // setChecked(true)
                setDateOfJoinnig1(date)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', name)
        data.append('photo', image)
        // data.append('office', office)
        data.append('cnic', cnic)
        data.append('remarks', description)
        data.append('employeeId', employeeId)
        // data.append('purchase', checked)

        data.append('mobileNumber', mobileNumber1)
        data.append('placeOfPosting', placeOfPosting1Name)
        // data.append('remarks', remarks1)
        data.append('dateOfJoining', dateOfJoinnig1)
        data.append('wing', wing1)
        data.append('pg', pg1)
        data.append('department', department1)
        data.append('designation', designation1)
        data.append('emailAddress', emailAddress1)

        axios
            .put(`${config.base_url}/api/v1/employee/${userId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 400') {
                    setEditSnackBar(true)
                }
            })
    }

    const onEditHandler = (id, user) => {
        setEditEmployeeDialog(true)
        setName(user.name)
        // setOffice(user.office)
        setCnic(user.cnic)
        setPlaceOfPosting1Name(user.placeOfPosting)
        setEmailAddress1(user.emailAddress)
        setPg1(user.pg)
        setImage(user.photo)
        setEmployeeId(user.employeeId)
        setDescription(user.remarks)
        setMobileNumber1(user.mobileNumber)
        setWing1(user.wing)
        setDesignation1(user.designation)
        setDepartment1(user.department)
        const date = new Date(user.dateOfJoining).toISOString().split('T')[0]
        setDateOfJoinnig1(date)
        // setChecked(user.purchase)
        setUserId(id)
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setCreateSnackBar(false)
    }

    const handleEditClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setEditSnackBar(false)
    }
    ///employee dialogs close

    const handleEmployeeClose = () => {
        setEmployeeDialogs(false)
        setSdate('')
        setSdate1('')
        setOffice('')
        setName('')
    }

    const createAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleCreateSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCreateSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const editAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleEditSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEditSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const onDeleteHandler = (id) => {
        setOpen5(true)
        setUserId(id)
        if (open5 && userId) {
            axios
                .delete(`${config.base_url}/api/v1/employee/${userId}`)
                .then((res) => {
                    getAlldata()
                    setOpen5(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    // const iconeHandler = (event) => {
    //     setAnchorEl(event.currentTarget);
    //   };
    //   const iconeHandler1 = (event) => {
    //     setAnchorEl1(event.currentTarget);
    //   };
    //   const handleClose = () => {
    //     setAnchorEl();
    //   };
    //   const handleClose1 = () => {
    //     setAnchorEl1();
    //   };

    //   const [checkedBox1, setCheckedBox1] = React.useState(true);
    //   const [emailAdress, setEmailAdress] = React.useState(false);
    //   const [designation, setDesgnation] = React.useState(false);
    //   const [remark, setRemark] = React.useState(false);
    //   const [dateOfJoining, setDateOfJoining] = React.useState(false);
    //   const [pg, setPg] = React.useState(false);
    //   const [wing, setWing] = React.useState(false);
    //   const [placeOfPoset, setPlaceOfPoset] = React.useState(false);
    //   const [department, setDepartment] = React.useState(false);
    //   const [mobileNumber, setMobileNumber] = React.useState(false);

    //   const checkBoxHandler1 = (event) => {
    //     setCheckedBox1(event.target.checked);

    //   };

    //   const stateModifier= (state,func)=>{

    //     func(!state)

    //     func(!state)

    //   }
    const dateOfjoinnignHandler = (event) => {
        setDateOfJoinnig1(event.target.value)
    }

    const ApplyFilters = () => {
        let data = {}
        data.dynamic = sdynamic
        data.designation = sdesignation
        data.startDate = sdate
        data.endDate = sdate1
        data.location = officeName
        data.department = addDepartment

        if (sdate !== '' && sdate1 === '') {
            alert('Please Select End Date Too')
            return
        } else if (sdate === '' && sdate1 !== '') {
            alert('Please Select Start Date Too')
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee/search`, data)
            .then((res) => {
                if (res.data.data.length < 1) {
                    alert('No record found')
                } else {
                    setUsers(res.data.data)
                    setEmployeeDialogs(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    /////department nameid/employee
    useEffect(() => {
        getEmployee()
        //  getData()
    }, [])

    const getEmployee = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodianIds(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    ///offices get the name
    useEffect(() => {
        getOfficedata()
        //  getData()
    }, [])

    const getOfficedata = () => {
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOffice(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    ////department
    useEffect(() => {
        getDepartmentdata()
        //  getData()
    }, [])

    const getDepartmentdata = () => {
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setAddDepartmentarr(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    //////demy data
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        {
            label: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { label: 'The Good, the Bad and the Ugly', year: 1966 },
        { label: 'Fight Club', year: 1999 },
        {
            label: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            label: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { label: 'Forrest Gump', year: 1994 },
        { label: 'Inception', year: 2010 },
        {
            label: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { label: 'Goodfellas', year: 1990 },
        { label: 'The Matrix', year: 1999 },
        { label: 'Seven Samurai', year: 1954 },
        {
            label: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { label: 'City of God', year: 2002 },
        { label: 'Se7en', year: 1995 },
        { label: 'The Silence of the Lambs', year: 1991 },
        { label: "It's a Wonderful Life", year: 1946 },
        { label: 'Life Is Beautiful', year: 1997 },
        { label: 'The Usual Suspects', year: 1995 },
        { label: 'Léon: The Professional', year: 1994 },
        { label: 'Spirited Away', year: 2001 },
        { label: 'Saving Private Ryan', year: 1998 },
        { label: 'Once Upon a Time in the West', year: 1968 },
        { label: 'American History X', year: 1998 },
        { label: 'Interstellar', year: 2014 },
        { label: 'Casablanca', year: 1942 },
        { label: 'City Lights', year: 1931 },
        { label: 'Psycho', year: 1960 },
        { label: 'The Green Mile', year: 1999 },
        { label: 'The Intouchables', year: 2011 },
        { label: 'Modern Times', year: 1936 },
        { label: 'Raiders of the Lost Ark', year: 1981 },
        { label: 'Rear Window', year: 1954 },
        { label: 'The Pianist', year: 2002 },
        { label: 'The Departed', year: 2006 },
        { label: 'Terminator 2: Judgment Day', year: 1991 },
        { label: 'Back to the Future', year: 1985 },
        { label: 'Whiplash', year: 2014 },
        { label: 'Gladiator', year: 2000 },
        { label: 'Memento', year: 2000 },
        { label: 'The Prestige', year: 2006 },
        { label: 'The Lion King', year: 1994 },
        { label: 'Apocalypse Now', year: 1979 },
        { label: 'Alien', year: 1979 },
        { label: 'Sunset Boulevard', year: 1950 },
        {
            label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
            year: 1964,
        },
        { label: 'The Great Dictator', year: 1940 },
        { label: 'Cinema Paradiso', year: 1988 },
        { label: 'The Lives of Others', year: 2006 },
        { label: 'Grave of the Fireflies', year: 1988 },
        { label: 'Paths of Glory', year: 1957 },
        { label: 'Django Unchained', year: 2012 },
        { label: 'The Shining', year: 1980 },
        { label: 'WALL·E', year: 2008 },
        { label: 'American Beauty', year: 1999 },
        { label: 'The Dark Knight Rises', year: 2012 },
        { label: 'Princess Mononoke', year: 1997 },
        { label: 'Aliens', year: 1986 },
        { label: 'Oldboy', year: 2003 },
        { label: 'Once Upon a Time in America', year: 1984 },
        { label: 'Witness for the Prosecution', year: 1957 },
        { label: 'Das Boot', year: 1981 },
        { label: 'Citizen Kane', year: 1941 },
        { label: 'North by Northwest', year: 1959 },
        { label: 'Vertigo', year: 1958 },
        {
            label: 'Star Wars: Episode VI - Return of the Jedi',
            year: 1983,
        },
        { label: 'Reservoir Dogs', year: 1992 },
        { label: 'Braveheart', year: 1995 },
        { label: 'M', year: 1931 },
        { label: 'Requiem for a Dream', year: 2000 },
        { label: 'Amélie', year: 2001 },
        { label: 'A Clockwork Orange', year: 1971 },
        { label: 'Like Stars on Earth', year: 2007 },
        { label: 'Taxi Driver', year: 1976 },
        { label: 'Lawrence of Arabia', year: 1962 },
        { label: 'Double Indemnity', year: 1944 },
        {
            label: 'Eternal Sunshine of the Spotless Mind',
            year: 2004,
        },
        { label: 'Amadeus', year: 1984 },
        { label: 'To Kill a Mockingbird', year: 1962 },
        { label: 'Toy Story 3', year: 2010 },
        { label: 'Logan', year: 2017 },
        { label: 'Full Metal Jacket', year: 1987 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: '2001: A Space Odyssey', year: 1968 },
        { label: "Singin' in the Rain", year: 1952 },
        { label: 'Toy Story', year: 1995 },
        { label: 'Bicycle Thieves', year: 1948 },
        { label: 'The Kid', year: 1921 },
        { label: 'Inglourious Basterds', year: 2009 },
        { label: 'Snatch', year: 2000 },
        { label: '3 Idiots', year: 2009 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ]

    const headers = [
        { label: 'Employee Name', key: 'name' },
        { label: 'Employee Id', key: 'employeeId' },
        { label: 'Email', key: 'emailAddress' },
        { label: 'Phone', key: 'mobileNumber' },
        { label: 'Department', key: 'department' },
        { label: 'Designation', key: 'designation' },
        { label: 'CNIC', key: 'cnic' },
        { label: 'Pg', key: 'pg' },
        { label: 'Wing', key: 'wing' },
        { label: 'Date Of Joining', key: 'dateOfJoining' },
        { label: 'Place Of Posting', key: 'office[0].name' },
        { label: 'Remarks', key: 'remarks' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    return (
        <>
            {open5 && (
                <ConfirmationDialog
                    open={open5}
                    onConfirmDialogClose={() => {
                        setOpen5(false)
                    }}
                    text={`Are You Sure Yoou Want To Delete This Employee?`}
                    title={`Are You Sure?`}
                    onYesClick={onDeleteHandler}
                />
            )}
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Employees
                </Typography>

                <Grid container spacing={3}>
                    {users
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((user) => (
                            <Grid key={user._id} item xs={12} sm={6} md={3}>
                                <UsersCard
                                    user={user}
                                    onDelete={onDeleteHandler}
                                    onEdit={onEditHandler}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br></br>
                <br></br>
                <br></br>
                {users.length > 0 && (
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'paginationBttns'}
                        previousLinkClassName={'previousBttn'}
                        nextLinkClassName={'nextBttn'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                    />
                )}
            </Container>

            <Tooltip title="Search Filters">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '9vh',
                        position: 'fixed',
                    }}
                    onClick={() => setEmployeeDialogs(true)}
                >
                    <SearchIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '17vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-employees.csv'}
                        data={users}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>
            <div>
                <Tooltip title="Add Employee">
                    <Fab
                        color="secondary"
                        aria-label="Add"
                        size="medium"
                        style={{
                            zIndex: 999,
                            right: '4vw',
                            bottom: '8vh',
                            position: 'fixed',
                        }}
                        onClick={() => setCreateEmployeeDialog(true)}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog
                    open={createEmployeeDialog}
                    onClose={handleCreateClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'ADD EMPLOYEE'}
                        <IconButton
                            aria-label="settings"
                            sx={{ ml: 45 }}
                            // onClick={iconeHandler}
                        >
                            <MoreVertIcon />
                        </IconButton>

                        {/* 
         <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open1}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <MenuItem >
              <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(mobileNumber,setMobileNumber)}
            defaultChecked = {mobileNumber === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Moible Number
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(remark,setRemark)}
            defaultChecked = {remark === false ?false:true}
                onChange={checkBoxHandler1}
              />
            Remarks
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(emailAdress,setEmailAdress)}
            defaultChecked = {emailAdress === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Email Address
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(placeOfPoset,setPlaceOfPoset)}
            defaultChecked = {placeOfPoset === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Place Of Posting 
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(pg,setPg)}
            defaultChecked = {pg === false ?false:true}
                onChange={checkBoxHandler1}
              />
              PG
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(wing,setWing)}
            defaultChecked = {wing === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Wing
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(department,setDepartment)}
            defaultChecked = {department === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Department
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(dateOfJoining,setDateOfJoining)}
            defaultChecked = {dateOfJoining === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Date Of Joining
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(designation,setDesgnation)}
            defaultChecked = {designation === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Designation
            </MenuItem>
         
      </Menu>  */}
                    </DialogTitle>

                    <DialogContent>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={officeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        officeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={office}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setOffice,
                                            setOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={cnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    type="number"
                                    autoComplete="off"
                                    helperText={
                                        cnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={cnic}
                                    onChange={(e) =>
                                        handleChange(e, setCnic, setCnicError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={employeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        employeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={employeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmployeeId,
                                            setEmployeeIdError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={mobilenumber1Error}
                                    id="category"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    size="small"
                                    autoComplete="off"
                                    type="number"
                                    helperText={
                                        mobilenumber1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={mobileNumber1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setMobileNumber1,
                                            setMobileNumber1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={remarks1Error}
     id="category"
     label="Remarks"
     placeholder="Remarks"
     size="small"
     autoComplete="off"
     helperText={
         remarks1Error === true
             ? 'Field Required'
             : ''
     }
     value={remarks1}
     onChange={(e) =>
         handleChange(e, setRemarks1, setRemarks1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={emailAddress1Error}
                                    id="category"
                                    label="Email Address"
                                    placeholder="Email Address"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        emailAddress1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={emailAddress1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmailAddress1,
                                            setEmailAddress1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={placeOfPosting1Error}
     id="category"
     label="Place Of Posting"
     placeholder="Place Of Posting"
     size="small"
     autoComplete="off"
     helperText={
         placeOfPosting1Error === true
             ? 'Field Required'
             : ''
     }
     value={placeOfPosting1}
     onChange={(e) =>
         handleChange(e, setPlaceOfPosting1, setPlaceOfPosting1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">
                                        Location
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={placeOfPosting1Name}
                                        label="Office"
                                        onChange={handlePlaceOfJoining}
                                    >
                                        {placeOfPosting1.map((officeList) => {
                                            return (
                                                <MenuItem
                                                    key={officeList._id}
                                                    value={officeList._id}
                                                >
                                                    {officeList.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={pg1Error}
                                    id="category"
                                    label="PG"
                                    type="number"
                                    placeholder="PG"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        pg1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={pg1}
                                    onChange={(e) =>
                                        handleChange(e, setPg1, setPg1Error)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            size="small"
                                        >
                                            Wing
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value=""
                                            label="Department"
                                            size="small"
                                            // onChange={(event) =>
                                            //     setCustodianId(event.target.value)
                                            // }
                                        >
                                            {/* {custodianIds.map((custodianId) => {
                                            return (
                                                <MenuItem
                                                    key={custodianId._id}
                                                    value={custodianId.name}
                                                >
                                                  
                                                    {custodianId.name}
                                                </MenuItem>
                                            )
                                        })} */}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={wing1Error}
                                    id="category"
                                    label="Wing"
                                    placeholder="Wing"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        wing1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={wing1}
                                    onChange={(e) =>
                                        handleChange(e, setWing1, setWing1Error)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            size="small"
                                        >
                                            Department
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={addDepartment}
                                            label="Department"
                                            size="small"
                                            onChange={(event) =>
                                                setAddDepartment(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            {addDepartmentarr.map((depart) => {
                                                return (
                                                    <MenuItem
                                                        key={depart._id}
                                                        value={depart.name}
                                                    >
                                                        {depart.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={department1Error}
                                    id="category"
                                    label="Department"
                                    placeholder="Department"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        department1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={department1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDepartment1,
                                            setDepartment1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={dateOfJoinnig1Error}
                                    id="category"
                                    label="Date Of Joinnig"
                                    placeholder="Date Of Joinnig"
                                    size="small"
                                    type="date"
                                    helperText={
                                        dateOfJoinnig1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={dateOfJoinnig1}
                                    onChange={dateOfjoinnignHandler}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={designation1Error}
                                    id="category"
                                    label="Designation"
                                    placeholder="Designation"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        designation1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={designation1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDesignation1,
                                            setDesignation1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<AddAPhotoIcon />}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            {/* <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Purchase</span>
                                <Switch
                                    {...label}
                                    onChange={handleCreateChange}
                                    checked={checked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid> */}

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={descriptionError}
                                    helperText={
                                        descriptionError && 'Field Required'
                                    }
                                    label="Remarks"
                                    placeholder="Remarks"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDescription,
                                            setDescriptionError
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateClose}>Cancel</Button>
                        <Button autoFocus onClick={handleCreateClickOpen}>
                            Confirm
                        </Button>
                    </DialogActions>

                    <Snackbar
                        open={createSnackBar}
                        autoHideDuration={5000}
                        onClose={handleCreateClosed}
                        message="Employee with same Id already exists"
                        action={createAction}
                    />
                </Dialog>
            </div>
            <Dialog
                open={editEmployeeDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT EMPLOYEE'}
                    {/* <IconButton aria-label="settings" 
                    sx={{ ml: 45}}
                    // onClick={iconeHandler1}
                    >
                          <MoreVertIcon /> 
          </IconButton> */}

                    {/* <Menu
        anchorEl1={anchorEl1}
        id="account-menu"
        open={open2}
        onClose={handleClose1}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <MenuItem >
              <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(mobileNumber,setMobileNumber)}
            defaultChecked = {mobileNumber === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Moible Number
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(remark,setRemark)}
            defaultChecked = {remark === false ?false:true}
                onChange={checkBoxHandler1}
              />
            Remarks
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(emailAdress,setEmailAdress)}
            defaultChecked = {emailAdress === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Email Address
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(placeOfPoset,setPlaceOfPoset)}
            defaultChecked = {placeOfPoset === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Place Of Posting 
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(pg,setPg)}
            defaultChecked = {pg === false ?false:true}
                onChange={checkBoxHandler1}
              />
              PG
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(wing,setWing)}
            defaultChecked = {wing === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Wing
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(department,setDepartment)}
            defaultChecked = {department === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Department
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(dateOfJoining,setDateOfJoining)}
            defaultChecked = {dateOfJoining === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Date Of Joining
            </MenuItem>
            <MenuItem >
            <Checkbox check={checkedBox1}
            //  {mobileNumber === "" ?"":defaultChecked} 
            onClick={()=>stateModifier(designation,setDesgnation)}
            defaultChecked = {designation === false ?false:true}
                onChange={checkBoxHandler1}
              />
              Designation
            </MenuItem>
         
      </Menu>  */}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={nameError}
                                id="category"
                                label="Name"
                                placeholder="Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    nameError === true ? 'Field Required' : ''
                                }
                                value={name}
                                onChange={(e) =>
                                    handleChange(e, setName, setNameError)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={officeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        officeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={office}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setOffice,
                                            setOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={cnicError}
                                id="cnic"
                                type="number"
                                label="CNIC"
                                placeholder="Enter CNIC"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    cnicError === true ? 'Field Required' : ''
                                }
                                value={cnic}
                                onChange={(e) =>
                                    handleChange(e, setCnic, setCnicError)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={employeeIdError}
                                id="employeeId"
                                label="Employee ID"
                                placeholder="Enter Employee ID"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    employeeIdError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={employeeId}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmployeeId,
                                        setEmployeeIdError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={mobilenumber1Error}
                                id="category"
                                type="number"
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    mobilenumber1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={mobileNumber1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setMobileNumber1,
                                        setMobileNumber1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        {/* 
 <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={remarks1Error}
     id="category"
     label="Remarks"
     placeholder="Remarks"
     size="small"
     autoComplete="off"
     helperText={
         remarks1Error === true
             ? 'Field Required'
             : ''
     }
     value={remarks1}
     onChange={(e) =>
         handleChange(e, setRemarks1, setRemarks1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={emailAddress1Error}
                                id="category"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddress1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={emailAddress1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress1,
                                        setEmailAddress1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={placeOfPosting1Error}
     id="category"
     label="Place Of Posting"
     placeholder="Place Of Posting"
     size="small"
     autoComplete="off"
     helperText={
         placeOfPosting1Error === true
             ? 'Field Required'
             : ''
     }
     value={placeOfPosting1}
     onChange={(e) =>
         handleChange(e, setPlaceOfPosting1, setPlaceOfPosting1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <div>
                                <FormControl
                                    sx={{ m: 1, minWidth: 150 }}
                                    size="small"
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        Place of Joining
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={placeOfPosting1Name}
                                        label="Office"
                                        onChange={handlePlaceOfJoining}
                                    >
                                        {placeOfPosting1.map((officeList) => {
                                            return (
                                                <MenuItem
                                                    key={officeList._id}
                                                    value={officeList._id}
                                                >
                                                    {officeList.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={pg1Error}
                                id="category"
                                label="PG"
                                placeholder="PG"
                                size="small"
                                autoComplete="off"
                                type="number"
                                helperText={
                                    pg1Error === true ? 'Field Required' : ''
                                }
                                value={pg1}
                                onChange={(e) =>
                                    handleChange(e, setPg1, setPg1Error)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={wing1Error}
                                id="category"
                                label="wing"
                                placeholder="wing"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    wing1Error === true ? 'Field Required' : ''
                                }
                                value={wing1}
                                onChange={(e) =>
                                    handleChange(e, setWing1, setWing1Error)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={department1Error}
                                id="category"
                                label="Department"
                                placeholder="Department"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    department1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={department1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDepartment1,
                                        setDepartment1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={dateOfJoinnig1Error}
                                id="date"
                                label="Date Of Joinnig"
                                placeholder="Date Of Joinnig"
                                type="date"
                                size="small"
                                helperText={
                                    dateOfJoinnig1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={dateOfJoinnig1}
                                onChange={dateOfjoinnignHandler}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={designation1Error}
                                id="category"
                                label="Designation"
                                placeholder="Designation"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    designation1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={designation1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDesignation1,
                                        setDesignation1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* old colde start */}

                        {/* 
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>


 */}

                        {/* old code end */}

                        <Grid item lg={3} md={3} sm={3} xs={3}>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleImage}
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<AddAPhotoIcon />}
                                >
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                        {/* <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Purchase</span>
                                <Switch
                                    {...label}
                                    onChange={handleEditChange}
                                    checked={checked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid> */}

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={descriptionError}
                                helperText={
                                    descriptionError && 'Field Required'
                                }
                                label="Remarks"
                                placeholder="Remarks"
                                style={{ textAlign: 'left' }}
                                hinttext="Message Field"
                                floatinglabeltext="MultiLine and FloatingLabel"
                                multiline
                                fullWidth
                                rows={3}
                                value={description}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDescription,
                                        setDescriptionError
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={editSnackBar}
                    autoHideDuration={5000}
                    onClose={handleEditClosed}
                    message="Employee with same Id already exists"
                    action={editAction}
                />
            </Dialog>

            {/* this is the dialogs of the employee search button */}

            <Dialog
                open={employeeDialogs}
                onClose={handleEmployeeClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{'Search Filters'}</DialogTitle>

                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Autocomplete
                                ListboxProps={{
                                    style: { maxHeight: '13rem' },
                                    position: 'bottom-start',
                                }}
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={custodianIds}
                                filterSelectedOptions={true}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                getOptionLabel={(option) =>
                                    `${option.name} / ${option.emailAddress} / ${option.cnic} / ${option.employeeId}`
                                }
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Name/Email/CNIC/Employee Code"
                                        />
                                    )
                                }}
                                value={custodianId}
                                onChange={(_event, vender) => {
                                    setCustodianId(vender)
                                }}
                            />
                            {/* <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Name/Email/CNIC/Employee Code"
                                    />
                                )}
                            /> */}
                            {/* <TextField
                                    id="category"
                                    label="Name/Email/CNIC/Employ Code"
                                    placeholder="Name/Email/CNIC/Employ Code"
                                    size="small"
                                    autoComplete="off"
                                    value={sdynamic}
                                    onChange={(e) =>
                                        setDynamic(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                /> */}
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={designations}
                                getOptionLabel={(option) => option._id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Designation"
                                    />
                                )}
                                value={sdesignation}
                                onChange={(_event, designation) => {
                                    console.log(designation)
                                    setSdesignation(designation)
                                }}
                            />

                            {/* <TextField
                                    id="category"
                                    label="Designation"
                                    placeholder="Designation"
                                    size="small"
                                    autoComplete="off"
                                    value={sdesignation}
                                    onChange={(e) =>
                                        setSdesignation(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                /> */}
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={placeOfPosting1}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Location"
                                            />
                                        )
                                    }}
                                    value={sOffice}
                                    onChange={(_event, office) => {
                                        setSOffice(office)
                                    }}
                                />
                            </Box>
                        </Grid>
                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    id="category"
                                    label="Reporting Manager"
                                    placeholder="Reporting Manager"
                                    size="small"
                                    autoComplete="off"
                                    value={sreportingManager}
                                    onChange={(e) =>
                                        setSreportingManager(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                />
                            </Grid> */}

                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    id="category"
                                    label="Department"
                                    placeholder="Department"
                                    size="small"
                                    autoComplete="off"
                                    value={sdepartment}
                                    onChange={(e) =>
                                        setSdepartment(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                />
                            </Grid> */}
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={departments}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Department"
                                            />
                                        )
                                    }}
                                    value={sdepartment}
                                    onChange={(_event, department) => {
                                        setSdepartment(department)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={pg1Error}
                                id="category"
                                label="PG"
                                placeholder="PG"
                                size="small"
                                autoComplete="off"
                                type="number"
                                helperText={
                                    pg1Error === true ? 'Field Required' : ''
                                }
                                value={pg1}
                                onChange={(e) =>
                                    handleChange(e, setPg1, setPg1Error)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>Start Date</Typography>
                            <TextField
                                value={sdate}
                                id="date"
                                label="Start Date"
                                type="date"
                                onChange={(e) => setSdate(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>End Date</Typography>
                            <TextField
                                value={sdate1}
                                id="date"
                                label="End Date"
                                type="date"
                                onChange={(e) => setSdate1(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmployeeClose}>Cancel</Button>
                    <Button autoFocus onClick={ApplyFilters}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UsersList
