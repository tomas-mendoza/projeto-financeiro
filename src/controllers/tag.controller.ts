import { Request, Response } from 'express';
import tags from '../lists/Tags';
import Tag from '../models/Tag';

export function create(req: Request, res: Response) {
  const description: string = req.body.description;

  const tag: Tag = {
    id: tags.length === 0 ? 1 : tags.slice(-1)[0].id + 1,
    description
  };

  tags.push(tag);

  res.status(200).json({
    status: 'Created!',
    message: 'The tag has been created successfully!',
    data: tag
  });
}

export function list(req: Request, res: Response) {
  return res.status(200).json({
    status: 'Ok!',
    message: 'This tag data has been fetched successfully!',
    tags
  });
}

export function search(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);

  const tag = tags.find((tag) => tag.id === id);

  if(!tag) {
    res.status(404).json({
      status: 'Internal server error!',
      message: 'This tag doesn\'t exist!'
    });
  }

  res.status(200).json({
    status: 'Ok',
    message: 'This tag data has been fetched successfully!',
    data: tag
  });
}

export function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const tag = tags.find((tag) => tag.id === id);

  if(!tag) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This tag doesn\'t exist!'
    });
  }

  const description = req.body.description;

  if(description) {
    tag.description = description;
  }

  return res.status(200).json({
    status: 'Ok',
    message: 'This tag has been updated successfully!',
    data: tag
  });
}

export function deleteTag(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const index = tags.findIndex((tag) => tag.id === id);

  if(!index) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This tag doesn\'t exist!'
    });
  }

  tags.splice(index, 1);

  res.status(200).json({
    status: 'Deleted!',
    message: 'The tag has been deleted successfully!'
  });
}