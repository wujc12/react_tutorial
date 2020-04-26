import React, {ChangeEvent, useEffect, useState} from "react";
import './index.css';
import {Button, Input} from "antd";
import * as toxicity from '@tensorflow-models/toxicity';
import {noop} from "../../utils";

const {TextArea} = Input;
const threshold = 0.9;

export default function TensorflowDemo () {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const [timeCost, setTimeCost] = useState(0);
    const [scores, setScores] = useState(new Float32Array(2));
    const [model, setModel] = useState();

    useEffect(() => {
        // 在组件加载后即刻加载模型，可以只需要加载一次
        // 模型加载需要「梯子」！
        loadModel().then(noop);
    }, []);

    const loadModel = async () => {
        try {
            const loadedModel = await toxicity.load(threshold, ['toxicity']);
            setModel(loadedModel);
        } catch (err) {
            console.error('模型加载失败！', err);
        }
    };

    const onTextAreaChange = (text: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(text.target.value);
    };

    const validateText = async (text: string) => {
        if (!model) {
            console.error('模型尚未加载完成！');
            return;
        }
        setButtonLoading(true);
        try {
            const startTime = new Date().getTime();
            const predictions = await model.classify([text]);
            setTimeCost(new Date().getTime() - startTime);
            setScores(predictions[0].results[0].probabilities);
        } catch (e) {
            console.error(e);
        }
        setButtonLoading(false);
    };

    return (
        <div className="tensorflow-container">
            <div className="tf-title">
                恶意程度检测，请输入英文：
            </div>
            <TextArea
                rows={3}
                className="tf-text-area"
                onChange={onTextAreaChange}
            />
            <Button
                type="primary"
                onClick={() => {validateText(inputText).then(noop)}}
                loading={buttonLoading}
                value={inputText}
            >{buttonLoading ? '检测中...' : '点击检测'}</Button>
            <div className="tf-result">
                <div>
                    时间消耗: {timeCost} ms
                </div>
                <div>
                    恶意评分: {scores[1] * 100}
                </div>
            </div>
        </div>
    );
}
