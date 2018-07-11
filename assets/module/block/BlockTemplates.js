module.exports = {
    templateList: [
        {
            id: 1,
            textureName: 'Block2_55X50.png'
        },
        {
            id: 2,
            textureName: 'Block1_55X50.png'
        },
        {
            id: 3,
            textureName: 'Block1_110X50.png'
        },
        {
            id: 4,
            textureName: 'Block1_220X50.png'
        },
        {
            id: 5,
            textureName: '2Block1_55X56.png'
        },
        {
            id: 6,
            textureName: '2Block1_1_40X36.png'
        },
        {
            id: 7,
            textureName: '2Block2_56X50.png'
        },
        {
            id: 8,
            textureName: '3Block1_55X50.png'
        },
        {
            id: 9,
            textureName: '3Block1_40X36.png'
        },
        {
            id: 10,
            textureName: '3Block1_1_55X50.png'
        },
        {
            id: 11,
            textureName: '3Block1_2_55X50.png'
        },
        {
            id: 12,
            textureName: '4Block1_40X36.png'
        },
        {
            id: 13,
            textureName: '4Block1_55X50.png'
        },
        {
            id: 14,
            textureName: '5Block1_55X50.png'
        },
        {
            id: 15,
            textureName: '5Block1_40X36.png'
        },
        {
            id: 16,
            textureName: 'Block1_UPPillar.png'
        },
        {
            id: 17,
            textureName: 'Block1_DownPillar.png'
        },
        {
            id: 18,
            textureName: '3Block1_2_55X50.png'
        },
    ],

    getBlockNameById(id) {
        // console.log('id: ', id);
        for (const item of this.templateList) {
            if (id === item.id) {
                return item.textureName.split('.')[0];
            }
        }
    }
}