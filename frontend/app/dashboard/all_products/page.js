'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import axios from 'axios';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import CustomImage from '@/components/Global/CustomImage';
import currencyFormatter from 'currency-formatter';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function DataTable() {
  const [products, setProducts] = React.useState([])
  const params = useSearchParams()
  const id = params.get("id")
  const handleDelete = (id) => {
    const response = axios.delete(`http://localhost:8000/api/product/delete-product/${id}`)
    alert("are you sure to delete product")
  };
 
  const getproducts = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/product/get-all-products`)
    return data;
  }
  const { data, isError, isFetching } = useQuery('products', getproducts)
  const columns = [
    { field: 'title', headerName: 'Title', width: 70 },
    {
      field: 'image', headerName: 'Image', width: 130, renderCell: (params) => {
        console.log(params)
        return (
          <div className='w-10 h-10'>
            <CustomImage url={params.row.image} fallback={'/fallback.png'} />
          </div>
        )
      }
    },
    {
      field: 'price', headerName: 'Price', width: 130, renderCell: (row) => {
        return (
          <span>{currencyFormatter.format(row.row.price, { code: 'USD' })}</span>
        )
      }
    },
    {
      field: 'category',
      headerName: 'Category',
      type: 'number',
      width: 90,
    },
    {
      field: 'quantities',
      headerName: 'Quantities',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
    },
    {
      field: 'discount',
      headerName: 'Discount',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      renderCell: (row) => {
        return (
          <span>{row.row.discount}%</span>
        )
      }
    },
    
    {
      field: 'update',
      headerName: 'Update',
      width: 120,
      renderCell: (row) => {
        return (
          <Link href={{ pathname: "/dashboard/update_product", query: { id: row.row._id } }}><button type="button" class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">Update

          </button></Link>
        )
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (row) => {
        return (
          <button
            type="button"
            className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-rose-800 text-white hover:bg-rows-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-rose-900 dark:focus:ring-offset-rose-800"
            onClick={() => handleDelete(row.row._id)} >
            Delete
          </button>
        );
      }
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 120,
      renderCell: (row) => {
        return (
          <Link href={{ pathname: "/dashboard/product_details", query: { id: row.row._id } }}>
          <button type="button" class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
          Details
        </button>
          </Link>
        );
      }
    }
  ];

  React.useEffect(() => {
    if (!isError && !isFetching) {
      setProducts(data)
    }
  }, [data, isError, isFetching])
  console.log(products)
  return (
    <div style={{ height: 400, width: '100%' }}>
      {isFetching ? <TableSkeleton /> : <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSize={[5, 10]}
        checkboxSelection
      />
      }
    </div>
  );
}