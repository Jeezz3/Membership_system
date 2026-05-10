<template> 
    <h1>Member</h1>
    <Button @click="show_add_member_dialog">
        <span>Add Member</span>
    </Button>

    <div class="member-table">
        <DataTable
            v-model:filters="filters" 
            :value="customers" paginator :rows="5"
            :rowsPerPageOptions="[5,10,20,50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :globalFilterFields="['name']">
            <template #header>
                <InputText v-model="filters['name'].value" placeholder="Name Search" />
            </template>
            <template>
                <Column field="id" header="Member ID"></Column>
                <Column field="name" header="Name">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
                <Column field="status" header="Status"></Column>
                <Column field="created_at" header="Joined Date"></Column>
                <Column>
                    <template #body="{ data }">
                        <Button @click="show_membership_dialog(); get_membership(data.id)">
                            <i class="pi pi-user-edit"></i>
                        </Button>
                    </template>
                </Column>
            </template>
        </DataTable>
    </div>


    <Dialog v-model:visible="add_member_dialog" modal header="Create Member">
        <span>Enter new member information</span>
        <div class="input-field">
            <label for="first_name">First Name</label>
            <InputText id="first_name" autocomplete="off" />
        </div>
        <div class="input-field">
            <label for="last_name">Last Name</label>
            <InputText id="last_name" autocomplete="off" />
        </div>
        <div class="button-section">
            <Button type="button" label="Cancel" @click="hide_add_member_dialog"></Button>
            <Button type="button" label="Save" @click="hide_add_member_dialog(); create_member()"></Button>
            
        </div>
    </Dialog>

    <Dialog v-model:visible="membership_dialog" modal header="Edit Membership">
        <div>
            <Form v-slot="$form">
                <div>
                    <label>Active Until</label>
                    <DatePicker name="date" v-model="membership_active_until"></DatePicker>
                </div>
                <div>
                    <label>Remaining Session</label>
                    <InputNumber inputId="minmax-buttons" mode="decimal" showButtons :min="-1" :max="100" v-model="membership_remaining">
                    </InputNumber>
                </div>
                <div>
                        <label for="is_paused">Paused</label>
                        <RadioButton inputId="is_paused" v-model="membership_is_paused" :binary="true"/>
                </div>
                <div>
                    <label>Paused Start Date</label>
                    <DatePicker name="paused_date" v-model="membership_pause_start_date"></DatePicker>
                </div>
            </Form>
        </div>

        <div class="button-section">
            <Button type="button" label="Cancel" @click="hide_add_member_dialog"></Button>
            <Button type="button" label="Save" @click="hide_membership_dialog(); edit_membership()"></Button>
        </div>
    </Dialog>   




</template> 

<script src="@/scripts/Admin/AdminMember.js" />
<style src="@/css/Admin/AdminMember.css" />