import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import BasicLayout from "../layouts/BasicLayout";
import Seo from '../components/Seo';
import { getCarrusel, getCategories, getMarcas } from '../api/categories';
import Carrusel from '../components/PagePrincipal/Carrusel/Carrusel';
import TotalCategories from '../components/PagePrincipal/TotalCategories/TotalCategories';
import TotalServices from '../components/PagePrincipal/Services/TotalServices';
import Marcas from '../components/PagePrincipal/Marcas/Marcas';


const Home = () => {

  const [carrusel, setCarrusel] = useState(null);
  const [categories, setCategories] = useState(null);
  const [marcas, setMarcas] = useState(null);


  useEffect(() => {
    (async () => {
      const response = await getCarrusel();
      if (size(response) > 0) setCarrusel(response);
      else (setCarrusel([]));
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      if (size(response) > 0) setCategories(response);
      else (setCategories([]));
    })()
  }, [])
  
  useEffect(() => {
    (async () => {
      const response = await getMarcas();
      if (size(response) > 0) setMarcas(response);
      else (setMarcas([]));
    })()
  }, [])

  return (
    <>
      <BasicLayout>
        <Seo />
        {
          !carrusel
            ? (<Loader active>Cargando</Loader>)
            : (<Carrusel carrusel={carrusel} />)
        }
        {
          !categories
            ? (<Loader active>Cargando</Loader>)
            : (<TotalCategories categories={categories} />)
        }
        {
          !categories
            ? (<Loader active>Cargando</Loader>)
            : (<TotalServices />)
        }
        {
          !marcas
            ? (<Loader active>Cargando</Loader>)
            : (<Marcas marcas={marcas} />)
        }
      </BasicLayout>
    </>
  )
}

export default Home;
