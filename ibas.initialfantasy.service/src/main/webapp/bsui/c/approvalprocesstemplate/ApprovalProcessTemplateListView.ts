/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../3rdparty/openui5/typings/index.d.ts" />
import * as ibas from "../../../3rdparty/ibas/index";
import * as bo from "../../../borep/bo/index";
import { utils } from "../../../3rdparty/openui5/typings/ibas.utils";
import { IApprovalTemplateListView } from "../../../bsapp/ApprovalTemplate/index";

/**
 * 视图-ApprovalTemplate
 */
export class ApprovalTemplateListView extends ibas.BOListView implements IApprovalTemplateListView {

    /** 编辑数据，参数：目标数据 */
    editDataEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("");
        this.table = new sap.ui.table.Table("", {
            visibleRowCount: 15,
            rows: "{/}",
            columns: [
            ]
        });
        this.form.addContent(this.table);
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        press: function (): void {
                            that.fireViewEvents(that.newDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_view"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://display",
                        press: function (): void {
                            that.fireViewEvents(that.viewDataEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.ApprovalTemplate>(that.table).firstOrDefault()
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_edit"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://edit",
                        press: function (): void {
                            that.fireViewEvents(that.editDataEvent);
                        }
                    })
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    /** 嵌入查询面板 */
    embedded(view: any): void {
        this.page.addHeaderContent(view);
        this.page.setShowHeader(true);
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.ApprovalTemplate[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }

}