import { Request, Response } from 'express';
import Outgoing from '../models/Outgoing';
import outgoings from '../lists/Outgoings';
import tags from '../lists/Tags';

type createProps = {
  description: string,
  value: number,
  tag_id?: number
}

type updateProps = {
  description?: string,
  value?: number,
  tag_id?: number
}

export function create(req: Request, res: Response) {
  const { description, value, tag_id }: createProps = req.body;

  const outgoing: Outgoing = {
    id: outgoings.length === 0 ? 1 : outgoings.slice(-1)[0].id + 1,
    description,
    value,
  };

  if(tag_id) {
    const tag = tags.find((tag) => tag.id === tag_id);

    if(!tag) {
      return res.status(404).json({
        status: 'Internal server error!',
        message: 'This tag doesn\'t exist!'
      });
    }

    outgoing.tag_id = tag_id;
  }

  outgoings.push(outgoing);

  res.status(200).json({
    status: 'Created!',
    message: 'This outgoing has been created successfully!',
    data: outgoing
  });
}

export function list(req: Request, res: Response) {
  return res.status(200).json({
    status: 'Ok!',
    message: 'This outgoing data has been fetched successfully!',
    outgoings
  });
}

export function search(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);

  const outgoing = outgoings.find((outgoing) => outgoing.id === id);

  if(!outgoing) {
    res.status(404).json({
      status: 'Internal server error!',
      message: 'This outgoing doesn\'t exist!'
    });
  }

  res.status(200).json({
    status: 'Ok',
    message: 'This outgoing data has been fetched successfully!',
    data: outgoing
  });
}

export function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { description, value, tag_id }: updateProps = req.body;

  const outgoing = outgoings.find((outgoing) => outgoing.id === id);

  if(!outgoing) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This outgoing doesn\'t exist!'
    });
  }

  if(description) {
    outgoing.description = description;
  }

  if(value) {
    outgoing.value = value;
  }

  if(tag_id) {
    const tag = tags.find((tag) => tag.id === tag_id);

    if(!tag) {
      return res.status(404).json({
        status: 'Internal server error!',
        message: 'This tag doesn\'t exist!'
      });
    }

    outgoing.tag_id = tag_id;
  }

  return res.status(200).json({
    status: 'Ok',
    message: 'This income has been updated successfully!',
    data: outgoing
  });
}

export function deleteOutgoing(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const index = outgoings.findIndex((outgoing) => outgoing.id === id);
  
  if(index < 0) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This outgoing doesn\'t exist!',
    });
  }

  outgoings.splice(index, 1);

  res.status(200).json({
    status: 'Deleted!',
    message: 'This outgoing has been deleted successfully!'
  });
}