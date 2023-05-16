

import {selectPropertyListState} from "@/app/store/propertyListSlice";
import {useSelector} from "react-redux";

import fetchListings from "@/app/ApiServices/backend/FetchListings";




import  React, { CSSProperties, useState } from 'react'
import { List, Image, InfiniteScroll } from 'antd-mobile'
import {
    List as VirtualizedList,
    AutoSizer,
    WindowScroller,
} from 'react-virtualized'


type Item = {
    avatar: string
    name: string
    description: string
}

const item = {
    avatar:
        'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
}





export default () => {

    const storeLocation = useSelector(state => state.location.locationState)
    const storeRadius =  useSelector(state => state.radius.radiusState)
    const storeHasGarage= useSelector(state=>state.hasGarage.hasGarageState)
    const storeNumOfBedroomsMax = useSelector(state=>state.numOfBedroomsMax.numOfBedroomsMaxState)
    const storeNumOfBedroomsMin = useSelector(state=>state.numOfBedroomsMin.numOfBedroomsMinState)
    const storeNumOfBathroomsMax = useSelector(state=>state.numOfBathroomsMax.numOfBathroomsMaxState)
    const storeNumbOfBathroomsMin =  useSelector(state=>state.numOfBathroomsMin.numOfBathroomsMinState)
    const storePetsAllowed =  useSelector(state=>state.petsAllowed.petsAllowedState)
    const storePropertyType = useSelector(state=>state.propertyType.propertyTypeState)
    const storeStatus = useSelector(state=>state.status.statusState)
    const storePriceMin = useSelector(state=>state.priceMin.priceMinState)
    const storePriceMax = useSelector(state=>state.priceMax.priceMaxState)


    const [data, setData] = useState<Item[]>(Array(20).fill(item))
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {

        // const radius = StoreRadius === 1609.34 ? '1609.34' : '16093.4'
        const queryObject ={
            priceMin : storePriceMin,
            priceMax : storePriceMax,
            numOfBedroomsMin : storeNumOfBedroomsMin,
            numOfBedroomsMax : storeNumOfBedroomsMax,
            numOfBathroomsMin: storeNumbOfBathroomsMin,
            numOfBathroomsMax: storeNumOfBathroomsMax,
            petsAllowed :storePetsAllowed,
            hasGarage : storeHasGarage,
            status : storeStatus,
            propertyType : storePropertyType,
            location:storeLocation,
            radius:JSON.stringify(storeRadius)
            
        }
        console.log(queryObject)
        const append = await fetchListings(queryObject)
        console.log(append)
        setData(val => [...val, ...Array(append.length).fill(item)])
        setHasMore(append.length > 0)
    }

    function rowRenderer({
                             index,
                             key,
                             style,
                         }: {
        index: number
        key: string
        style: CSSProperties
    }) {
        const item = data[index]
        if (!item) return

        return (
            <List.Item
                key={key}
                style={style}
                prefix={
                    <Image
                        src={item.avatar}
                        style={{ borderRadius: 20 }}
                        fit='cover'
                        width={40}
                        height={40}
                    />
                }
                description={item.description}
            >
                {item.name} {index}
            </List.Item>
        )
    }

    return (
        <div>
            <WindowScroller
                onScroll={({ scrollTop }) => {
                    console.log('scrollTop', scrollTop)
                }}
            >
                {({ height, scrollTop, isScrolling }) => (
                    <List>
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <VirtualizedList
                                    autoHeight
                                    rowCount={data.length}
                                    rowRenderer={rowRenderer}
                                    width={width}
                                    height={height}
                                    rowHeight={70}
                                    overscanRowCount={10}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                />
                            )}
                        </AutoSizer>
                    </List>
                )}
            </WindowScroller>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
    )
}