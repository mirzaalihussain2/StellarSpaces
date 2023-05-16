import {selectPropertyListState, setPropertyListState} from "@/app/store/propertyListSlice";
import {useSelector} from "react-redux";

import fetchListings from "@/app/ApiServices/backend/FetchListings";


import React, {CSSProperties, useEffect, useState} from 'react'
import {List, Image, InfiniteScroll} from 'antd-mobile'
import {
    List as VirtualizedList,
    AutoSizer,
    WindowScroller,
} from 'react-virtualized'
import {setHasGarageState} from "@/app/store/hasGarageSlice";
import {setLocationState} from "@/app/store/locationSlice";
import {setPropertyTypeState} from "@/app/store/propertyTypeSlice";
import {setPetsAllowedState} from "@/app/store/petsAllowedSlice";
import {setNumOfBedroomsMaxState} from "@/app/store/numOfBedroomsMaxSlice";
import {setNumOfBedroomsMinState} from "@/app/store/numOfBedroomsMinSlice";
import {setNumOfBathroomsMaxState} from "@/app/store/numOfBathroomsMaxSlice";
import {setNumOfBathroomsMinState} from "@/app/store/numOfBathroomsMinSlice";
import {setStatusState} from "@/app/store/statusSlice";
import {setPriceMinState} from "@/app/store/priceMinSlice";
import {setPriceMaxState} from "@/app/store/priceMaxSlice";


export default () => {


    const storeLocation = useSelector(state => state.location.locationState)
    const storeRadius = useSelector(state => state.radius.radiusState)
    const storeHasGarage = useSelector(state => state.hasGarage.hasGarageState)
    const storeNumOfBedroomsMax = useSelector(state => state.numOfBedroomsMax.numOfBedroomsMaxState)
    const storeNumOfBedroomsMin = useSelector(state => state.numOfBedroomsMin.numOfBedroomsMinState)
    const storeNumOfBathroomsMax = useSelector(state => state.numOfBathroomsMax.numOfBathroomsMaxState)
    const storeNumbOfBathroomsMin = useSelector(state => state.numOfBathroomsMin.numOfBathroomsMinState)
    const storePetsAllowed = useSelector(state => state.petsAllowed.petsAllowedState)
    const storePropertyType = useSelector(state => state.propertyType.propertyTypeState)
    const storeStatus = useSelector(state => state.status.statusState)
    const storePriceMin = useSelector(state => state.priceMin.priceMinState)
    const storePriceMax = useSelector(state => state.priceMax.priceMaxState)
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [radius, setRadius] = useState(storeRadius === 1609.34 ? '1609.34' : '16093.4')

    useEffect(() => {
        setRadius(storeRadius === 1609.34 ? '1609.34' : '16093.4')

        loadMore()


    }, [storeRadius])


    async function loadMore() {
        const page = data.length / 5 + 1
        const perPage = 5
        // setRadius(storeRadius === 1609.34 ? '1609.34' : '16093.4')
        const queryObject = {
            priceMin: storePriceMin,
            priceMax: storePriceMax,
            numOfBedroomsMin: storeNumOfBedroomsMin,
            numOfBedroomsMax: storeNumOfBedroomsMax,
            numOfBathroomsMin: storeNumbOfBathroomsMin,
            numOfBathroomsMax: storeNumOfBathroomsMax,
            petsAllowed: storePetsAllowed,
            hasGarage: storeHasGarage,
            status: storeStatus,
            propertyType: storePropertyType,
            location: storeLocation,
            radius: JSON.stringify(storeRadius),
            page,
            perPage
            

        }
        if(radius!==storeRadius){
            const append = await fetchListings(queryObject)
            console.log(append)

            setData((prevData) => {
                const uniqueData = append.filter((item) => !prevData.some((prevItem) => prevItem.id === item.id));
                return [...prevData, ...uniqueData]
            });
            setHasMore(append.length > 0)
            console.log(data)
        }
       
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
                        style={{borderRadius: 20}}
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
                onScroll={({scrollTop}) => {
                    console.log('scrollTop', scrollTop)
                }}
            >
                {({height, scrollTop, isScrolling}) => (
                    <List>
                        <AutoSizer disableHeight>
                            {({width}) => (
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
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
        </div>
    )
}