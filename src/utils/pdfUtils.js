import React from 'react';
import { Page, Text, View, Document, StyleSheet  } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    section: {
        flexGrow: 1,
        verticalAlign: 'middle',
        marginTop: '20px'
    },
    slot:{
        width: '140px',
        minHeight: '100px',
        overflowWrap: 'break-word',
        overflow: 'wrap',
        textAlign: 'center',
        padding: '10px',
        verticalAlign: 'middle',
        backgroundColor: 'blanchedalmond',
        color: 'darkblue',
        marginBottom: '10px',
        fontSize: '16',
        borderColor: 'silver',
        borderStyle: 'solid',
        borderWidth: '1px'
    },
    xhead:{
        width: '120px',
        minHeight: '100px',
        borderBottom: 'solid',
        marginBottom: '10px',
        marginLeft: '10px',
        paddingTop: '20px'
    },
    yhead:{
        width: '140px',
        minHeight: '50px',
        textAlign: 'center'
    },
    corner:{
        width: '120px',
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
        minHeight: '100px',
        overflowWrap: 'break-word',
        overflow: 'wrap',
        textAlign: 'center',
        padding: '10px',
        verticalAlign: 'middle',
        backgroundColor: 'blanchedalmond',
        color: 'darkblue',
        marginBottom: '10px',
        fontSize: '16',
        borderColor: 'silver',
        borderStyle: 'solid',
        borderWidth: '1px'
    },
    xheadL:{
        width: '80px',
        minHeight: '100px',
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
        verticalAlign: 'middle',
        marginTop: '20px'
    },
    line:{
        width: '100%',
        minHeight: '50px',
        overflowWrap: 'break-line',
    },
    ingredient:{
        
    }
});


export const DownloadableMealPlan = ({mealplan}) => (
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
        </Page>
    </Document>
);

export const DownloadableMealPlanLandscape = ({mealplan}) => (
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
        </Page>
    </Document>
);

export const DownloadableShoppingList = ({list, heading}) => {
    
    const listItems = list.map((item, i) => {
        return(
            <Text key={i} style={styles.line}>{`${item.name} \tx ${item.qty}`}</Text>
        )
    });
    return(
        <Document>
            <Page size="A4" orientation={'portrait'} style={styles.page}>
                <View style={styles.shoppingList}>
                    <Text style={styles.line}>{heading}</Text>
                    {listItems}
                </View>
            </Page>
        </Document>
    );
}