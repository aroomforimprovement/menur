import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf  } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        color: '#464678',
        paddingLeft: '10px',
        paddingRight: '25px',
        borderColor:'#6464c8',
        borderStyle:'solid',
        borderWidth:'5px',
        borderRadius: '20px'
    },
    section: {
        flexGrow: 1,
        verticalAlign: 'middle',
        marginTop: '20px'
    },
    slot:{
        width: '100px',
        minHeight: '80px',
        overflowWrap: 'break-word',
        overflow: 'wrap',
        textAlign: 'center',
        padding: '10px',
        verticalAlign: 'middle',
        backgroundColor: '#ece8fd',
        color: '#6464c8',
        marginBottom: '10px',
        fontSize: '16',
        borderColor: '#6464c8',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '20px'
    },
    xhead:{
        width: '100px',
        minHeight: '80px',
        borderBottom: 'solid',
        marginBottom: '10px',
        marginLeft: '10px',
        paddingTop: '20px'
    },
    yhead:{
        width: '100px',
        minHeight: '50px',
        textAlign: 'center'
    },
    corner:{
        width: '100px',
        minHeight: '50px',
        textAlign: 'center'
    },
    ing:{
        fontSize:'9',
        color: 'black',
        display: 'block'
    },
    slotL:{
        width: '100px',
        minHeight: '80px',
        overflowWrap: 'break-word',
        overflow: 'wrap',
        textAlign: 'center',
        padding: '10px',
        verticalAlign: 'middle',
        backgroundColor: '#ece8fd',
        color: '#6464c8',
        marginBottom: '10px',
        fontSize: '16',
        borderColor: '#aaaaff',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '20px'
    },
    xheadL:{
        width: '80px',
        minHeight: '80px',
        borderBottom: 'solid',
        marginBottom: '10px',
        marginLeft: '10px',
        paddingTop: '20px'
    },
    yheadL:{
        width: '100px',
        minHeight: '50px',
        textAlign: 'center'
    },
    cornerL:{
        width: '80px',
        minHeight: '50px',
        textAlign: 'center'
    },
    shoppingList: {
        flexGrow: 1,
        verticalAlign: 'top',
        margin: '5%'

    },
    line:{
        overflowWrap: 'break-line',
        marginTop: '0px',
        marginBottom: '0px',
        padding: '0px'
    },
    ingredient:{
        
    },
    brand:{
        display:'block',
        position:'absolute',
        bottom:'50px',
        left:'20px',
        width:'100%'
    }
});

export const Brand = () => {
    return(
        <Text style={styles.brand}>MENUR</Text>    
    )
}

export const DownloadableMealPlan = ({mealplan}) => {

    return(
        <Document >
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.corner}>*</Text>
                    <Text style={styles.xhead}>Monday</Text>
                    <Text style={styles.xhead}>Tuesday</Text>
                    <Text style={styles.xhead}>Wednesday</Text>
                    <Text style={styles.xhead}>Thursday</Text>
                    <Text style={styles.xhead}>Friday</Text>
                    <Text style={styles.xhead}>Saturday</Text>
                    <Text style={styles.xhead}>Sunday</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yhead}>Breakfast</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Monday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Tuesday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Wednesday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Thursday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Friday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Saturday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Sunday.Breakfast.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yhead}>Lunch</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Monday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Tuesday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Wednesday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Thursday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Friday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Saturday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Sunday.Lunch.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yhead}>Dinner</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Monday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Tuesday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Wednesday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Thursday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Friday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Saturday.Dinner.name : 'nothing'}</Text>
                    <Text style={styles.slot}>{mealplan ? mealplan.Sunday.Dinner.name : 'nothing'}</Text>
                </View>
                <Brand />
            </Page>
        </Document>
    )
};

export const DownloadableMealPlanLandscape = ({mealplan}) => {
    return(
        <Document >
            <Page size="A4" orientation={'landscape'} style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.cornerL}>*</Text>
                    <Text style={styles.xheadL}>Breakfast</Text>
                    <Text style={styles.xheadL}>Lunch</Text>
                    <Text style={styles.xheadL}>Dinner</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Monday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Monday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Monday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Monday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Tuesday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Tuesday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Tuesday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Tuesday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Wednesday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Wednesday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Wednesday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Wednesday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Thursday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Thursday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Thursday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Thursday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Friday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Friday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Friday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Friday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Saturday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Saturday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Saturday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Saturday.Dinner.name : 'nothing'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.yheadL}>Sunday</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Sunday.Breakfast.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Sunday.Lunch.name : 'nothing'}</Text>
                    <Text style={styles.slotL}>{mealplan ? mealplan.Sunday.Dinner.name : 'nothing'}</Text>
                </View>
                <Brand />
            </Page>
        </Document>
    )
};

export const DownloadableShoppingList = ({list, heading}) => {
    
    const listItems = list ? list.map((item, i) => {
        return(
            <Text  key={i} style={styles.line}>{`${item.name} \tx ${item.qty}`}</Text>
        )
    }) : <div></div>;

    return(
        <Document>
            <Page size="A4" orientation={'portrait'} style={styles.page}>
                <View style={styles.shoppingList} >
                    <Text style={styles.line}>{heading}</Text>
                    {listItems}
                </View>   
                <Brand />       
            </Page>
        </Document>
    );
}

export const DownloadableMealPlanWithShoppingList = ({mealplan, lists, isLandscape}) => {
    const listDocs = lists ? lists.map((list, i) => {
        return(
            <DownloadableShoppingList key={i} 
                list={list.list} heading={list.heading} />
        );
    }) : undefined;

    return(
        <Document>
            {isLandscape ? <DownloadableMealPlanLandscape mealplan={mealplan}/> 
                : <DownloadableMealPlan mealplan={mealplan}/>}
            {listDocs}
        </Document>
    );
}

export const GetSingleShoppingList = async (list) => {
    return await pdf(DownloadableShoppingList({list:list.list, heading:list.heading})).toBlob();
}

export const MultipleShoppingLists = async ({lists}) => {
    return await Promise.all(lists.map(GetSingleShoppingList));
}
