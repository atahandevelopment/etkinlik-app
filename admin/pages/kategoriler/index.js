import React from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { getTitle } from '@/store/meta-title';

export default function Kategoriler() {
    const dispatch = dispatch();
    dispatch(getTitle("Kategoriler"));
  return (
    <div>
        
    </div>
  )
}

Kategoriler.getLayout = (page) => {
    return <DefaultLayout>{page}</DefaultLayout>;
  };
  