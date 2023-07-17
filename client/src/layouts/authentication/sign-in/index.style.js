export const title = {
    fontSize: '1.4rem',
    fontFamily: 'Montserrat Black',
    color: '#A0C49D'
}

export const input = {
    border: 'solid 1px #ced6e0',
    padding: {
        xs: '6px 8px',
        md: '8px 10px'
    },
    borderRadius: '6px'
}

export const btn = { 
    textAlign: 'center', 
    backgroundColor: '#A0C49D', 
    padding: '10px 40px', 
    borderRadius: '8px', 
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#82a17f' },
    color: '#F1F6F9',
    cursor: 'pointer'
}

export const cncl = { 
    textAlign: 'center', 
    padding: '10px 40px', 
    border: 'solid 1px #A0C49D',
    borderRadius: '8px', 
    transition: 'all 0.2s ease-in-out',
    color: '#A0C49D',
    cursor: 'pointer'
}

export const code = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { 
                textAlign: 'center', 
                fontSize: '120%', 
                textTransform: 'uppercase', 
                fontWeight:'bold',
                color: '#212A3E',
                fontFamily: 'Montserrat'
            }
        }
    }
}