export const content = ({ condition }) => ({
    width: {
        xs: '100%',
        lg: condition ? '78%' : '100%'
    },
    height: '100%',
    overflow: 'hidden'
})

export const history = {
    width: '22%',
    height: '100%',
    paddingTop: '70px',
    display: {
        xs: 'none',
        lg: 'flex'
    }
}

export const title = {
    fontFamily: 'Montserrat Black',
    fontSize: '1.17rem',
    color: '#394867',
}

export const loader = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
}

export const search = {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: 'solid 1px #F3F3F3',
    borderRadius: '50px',
    padding: '5px 15px 5px 15px',
    width: {
        xs: '100%',
        sm: '350px',
        md: '500px'
    }
}

export const orderby = {
    padding: '5px 15px',
    backgroundColor: '#DDE6ED',
    borderRadius: '20px',
    color: '#526D82',
    cursor: 'pointer'
}

export const listview = {
    padding: '20px 16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none'
}

export const listtitle = {
    color: '#27374D',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
}

export const subtitle = {
    color: '#526D82',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
}

export const caption = {
    color: '#9DB2BF',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
}

export const select = {
    width: {
        xs: '40%',
        md: '30%',
        lg: '20%'
    },
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '12px 8px 9px 8px',
        md: '9px 10px 6px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px',
    transition: 'all 0.2s ease-in-out'
}

export const lbl = {
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    width: '100%',
    padding: '2px 0',
    transition: 'all 0.2s ease-in-out'
}

export const logs = {
    backgroundColor: '#526D82',
    color: '#FFFFFF',
    padding: '7px 12px',
    borderRadius: '7px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    display: { xs: 'block', lg: 'none' },
    '&:hover': { backgroundColor: '#3f5465' }
}

export const download = {
    backgroundColor: '#526D82',
    color: '#FFFFFF',
    padding: '7px 12px',
    borderRadius: '7px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#3f5465' }
}

export const upload = {
    backgroundColor: '#526D82',
    color: '#FFFFFF',
    padding: '7px 12px',
    borderRadius: '7px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#3f5465' }
}

export const btnicon = { 
    display: {
        xs: 'block',
        lg: 'none'
    }, 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#A0C49D',
    color: '#ffffff',
    borderRadius: '7px',
    padding: '7px 15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#86a583' }
}

export const btntxt = { 
    display: {
        xs: 'none',
        lg: 'block'
    }, 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#A0C49D',
    color: '#ffffff',
    borderRadius: '7px',
    padding: '7px 15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#86a583' }
}