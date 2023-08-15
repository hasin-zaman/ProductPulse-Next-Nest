import Button from '@mui/material/Button';

export default function MUIButton(props: any) {

  return (
    <Button 
    variant='contained' 
    size='medium' 
    disabled={props.disabled}
    endIcon={props.icon ? props.icon : null}
    sx={{minWidth: '130px','&:hover': {backgroundColor: props.color}}}
    style={{backgroundColor: 'rgb(32,33,36)'}}
    type={props.type}
    onClick={props.onClick}
    >
        {props.title}
    </Button>
  );
}
