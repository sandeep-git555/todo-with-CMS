import React from 'react'
import classNames from 'classnames'
import { useTheme } from '@table-library/react-table-library/theme'
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  TableNode,
  Data
} from '@table-library/react-table-library/table'
import { useSort } from '@table-library/react-table-library/sort'
import { usePagination } from "@table-library/react-table-library/pagination";

import type { Task, User } from '@/app/types'
import updateUserTasks from '@/app/providers/updateTask'
import Checkbox from '../Form/Checkbox'
import TaskCell from './Task'
import Delete from './Delete'

export default function ListItem({user}:{user:User}){
  const {tasks} = user
  if(!tasks || tasks?.length === 0) return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-2xl'>Seems like you haven't created any tasks</p>
    </div>
  )

  const [data, setData] = React.useState<Data<TableNode>>({nodes: tasks as TableNode[]})
  const theme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: 50px repeat(1, minmax(0, 1fr)) 100px 100px;
    `,
    BaseRow: `
      font-size: 14px;
    `,
    HeaderRow: `
      background-color: black;
      color: white;
      font-weight: 500;
      .th {
        border-bottom: 1px solid white;
      }
    `,
    Row: `
      position: relative;
      cursor: pointer;
      .td {
        border-bottom: 1px solid black;
      }
      &:hover .td {
        background: #eaeaea;
      }
    `,
    BaseCell: `
      height: 80px;
      padding: 8px;
    `
  })
  const sort = useSort(
    data,
    {onChange: ()=> {} },
    {
      sortFns: {
        taskName: (array:TableNode[]) => array.sort((a, b) => a.taskName.localeCompare(b.taskName)),
        description: (array:TableNode[]) => array.sort((a, b) => a.description.localeCompare(b.description)),
        status: (array:TableNode[])=>array.sort((a, b)=> a.status ? 1 : -1),
        priority: (array:TableNode[])=>array.sort((a,b)=>a.priority ? 1 : -1)
      }
    },
  )
  const handleUpdate = async (e:any, item:Task) => {
    const {name, checked} = e.target
    const taskIndex = data.nodes.findIndex(task => task.id === item.id)
    if(taskIndex!==-1) {
      const updatedNodes = [...data.nodes]
      updatedNodes[taskIndex] = { ...updatedNodes[taskIndex], [name]: checked} 
      setData({
        ...data,
        nodes: updatedNodes 
      })
      console.log('%csrc/app/components/Tasks/List.tsx:86 updatedNodes', 'color: #26bfa5;', updatedNodes);
    }
    const response = await updateUserTasks(user, data.nodes as Task[])
    console.log('%csrc/app/components/Tasks/List.tsx:88 response', 'color: #26bfa5;', response)
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
  });

  return (
    <div>
      <Table data={data} theme={theme} sort={sort} layout={{ custom: true, horizontalScroll: true }} pagination={pagination}>
      {(tableList:Task[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell stiff>Done</HeaderCell>
              <HeaderCell resize>Name</HeaderCell>
              <HeaderCell stiff>Priority</HeaderCell>
              <HeaderCell stiff />
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item: Task) => (
              <Row key={item.id} item={item as TableNode}>
                <Cell stiff>
                  <Checkbox  name="status" value={item.status} onChange={(e)=>handleUpdate(e, item)} />
                </Cell>
                <Cell>
                  <TaskCell name={item.taskName} description={item.description} />
                </Cell>
                <Cell stiff>
                  <Checkbox  name="priority" value={item.priority} onChange={(e)=>handleUpdate(e, item)} />
                </Cell>
                <Cell stiff>
                  <Delete item={item} />
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
      </Table>
      <div className='flex items-center justify-end mt-4 gap-1'>
      Page:{" "}
      {pagination.state.getPages(data.nodes).map((node:TableNode, index:number) => (
        <button
          key={index}
          type="button"
          className={classNames('flex justify-center w-6 border border-black font-bold', pagination.state.page === index ? "text-gray-300" : "")}
          onClick={() => pagination.fns.onSetPage(index)}
        >
          {index + 1}
        </button>
      ))}
      </div>
    </div>
  )
};
