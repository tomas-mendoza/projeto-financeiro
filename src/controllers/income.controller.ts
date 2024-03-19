import { Request, Response } from 'express';
import incomes from '../lists/Incomes';
import Income from '../models/Income';
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

  const income: Income = {
    id: incomes.length === 0 ? 1 : incomes.slice(-1)[0].id + 1,
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

    income.tag_id = tag_id;
  }

  incomes.push(income);

  res.status(200).json({
    status: 'Created!',
    message: 'This income has been created successfully!',
    data: income
  });
}

export function list(req: Request, res: Response) {
  const data = incomes.map((income) => {
    if(income.tag_id) {
      return {
        id: income.id,
        description: income.description,
        value: income.value,
        tag: tags.find((tag) => tag.id === income.tag_id)
      };
    }
    return {
      id: income.id,
      description: income.description,
      value: income.value,
      tag: null
    };
  });

  return res.status(200).json({
    status: 'Ok!',
    message: 'This income data has been fetched successfully!',
    data
  });
}

export function search(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);

  const income = incomes.find((income) => income.id === id);

  if(!income) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This income doesn\'t exist!'
    });
  }

  res.status(200).json({
    status: 'Ok',
    message: 'This income data has been fetched successfully!',
    data: {
      id: income.id,
      description: income.description,
      value: income.value,
      tag: income.tag_id ? tags.find((tag) => tag.id === income.tag_id) : null
    }
  });
}

export function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { description, value, tag_id }: updateProps = req.body;

  const income = incomes.find((income) => income.id === id);

  if(!income) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This income doesn\'t exist!'
    });
  }

  if(description) {
    income.description = description;
  }

  if(value) {
    income.value = value;
  }

  if(tag_id) {
    const tag = tags.find((tag) => tag.id === tag_id);

    if(!tag) {
      return res.status(404).json({
        status: 'Internal server error!',
        message: 'This tag doesn\'t exist!'
      });
    }

    income.tag_id = tag_id;
  }

  return res.status(200).json({
    status: 'Ok',
    message: 'This income has been updated successfully!',
    data: income
  });
}

export function deleteIncome(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const index = incomes.findIndex((income) => income.id === id);
  
  if(index < 0) {
    return res.status(404).json({
      status: 'Internal server error!',
      message: 'This income doesn\'t exist!',
    });
  }

  incomes.splice(index, 1);

  res.status(200).json({
    status: 'Deleted!',
    message: 'This income has been deleted successfully!'
  });
}