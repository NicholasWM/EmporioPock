import React from 'react'
import {
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    View,
    Modal,
} from 'react-native';
import styles from './Style'

import ScrollHorizontal from '../ScrollHorizontal/index'

import { removeItemsSelecionados } from '../helpers/helpers'

export default function ModalSelecaoItems(props) {
    const {selecaoItems, setterItems, visibleModal, setterModal, nome, listaItemsDisponiveis} = props

    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={visibleModal}
            onRequestClose={() => {
                setterModal(false)
            }}>
            <ScrollView>
                <Text style={styles.titulo}>Escolha os Itens de seu interesse!</Text>
                <View >
                    {listaItemsDisponiveis.map(item => {
                        // console.log("Nenhuma carne selecionada?", !selecaoItems.length)
                        // console.log("Carne não esta na lista?", selecaoItems.findIndex(itemSelecionado => itemSelecionado.nome.includes(item.nome)))
                        if (!selecaoItems.length || selecaoItems.findIndex(itemSelecionado => itemSelecionado.nome.includes(item.nome)) == -1) {
                            return (
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={styles.selectModal}
                                        onPress={() => !!!selecaoItems.find(itemSelecionado => itemSelecionado.nome.includes(item.nome)) && setterItems([...selecaoItems, item])}>
                                        <Image source={item.img} style={styles.modalImg}></Image>
                                        <View style={styles.modalItemDesc}>
                                            <Text>{item.nome}</Text>
                                            <Text>{item.preco} {`${item.string_preco}`}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ alignSelf: 'center', fontSize: 10 }}>Clique para Selecionar</Text>
                                </View>
                            )
                        } else {
                            return (
                                <TouchableOpacity
                                    style={styles.selectModalSelecionado} key={item.id}
                                    onPress={() => removeItemsSelecionados(selecaoItems, setterItems, item)}>
                                    <Image source={item.img} style={styles.modalImg}></Image>
                                    <View style={styles.modalItemDesc}>
                                        <Text style={{ fontSize: 18, marginRight: 10 }}>Item Selecionado</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })}
                </View>
                <ScrollHorizontal
                    selecaoItems={selecaoItems}
                    setter={setterItems}
                ></ScrollHorizontal>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setterModal(!visibleModal);
                    }}>
                    <Text style={styles.buttonText}>Concluir</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    )
}