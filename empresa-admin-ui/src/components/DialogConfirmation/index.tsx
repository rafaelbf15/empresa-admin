'use client'
import React from 'react';
import { Button, Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react';

interface DialogConfirmationProps {
  open: boolean;
  handler: () => void;
  title: string;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function DialogConfirmation({ open, title, handler, onSubmit, isLoading }: DialogConfirmationProps) {

  return (
    <Dialog open={open} handler={handler} size='sm' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}> 
      <DialogHeader className='flex flex-col items-start' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
        <Typography variant='h6' className='mb-4' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
          {title?? ''}
        </Typography>
      </DialogHeader>
      <DialogBody onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
        <div className="flex justify-center">
          <Button className="m-2" variant="gradient" color="red"  disabled={isLoading} onClick={() => onSubmit()} onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
            Sim
          </Button>
          <Button className="m-2" variant="gradient" color="blue"  onClick={handler} onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
            Não
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  )
}