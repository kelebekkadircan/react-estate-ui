import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={data.postResponse}
              errorElement={<div>Failed to load posts</div>}
            >
              {/* {posts.posts.map((item) => (
                <Card key={item.id} item={item} />
              ))} */}
              {(postResponse) =>
                postResponse.data.posts.map((item) => (
                  <Card item={item} key={item.id} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={data.postResponse}
            errorElement={<div>Failed to load posts</div>}
          >
            {(postResponse) => <Map items={postResponse.data.posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
