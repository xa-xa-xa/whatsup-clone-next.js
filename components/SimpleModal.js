import {useEffect, useState} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    textAlign: "center"
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      minWidth: 200,
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      outline: 0,
      textAlign: "center",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function SimpleModal({open, onClose, text, title}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id={`simple-modal-${title}`}>{title}</h2>
      <p id={`simple-modal-${text}`}>
        {text}
      </p>
      <button type="button" onClick={onClose}>
        close
      </button>
      <SimpleModal />
    </div>
  );

  return (
    <section style={{textAlign: "center"}}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby={`simple-modal-${title}`}
        aria-describedby={`simple-modal-${text}`}
      >
        {body}
      </Modal>
    </section>
  );
}