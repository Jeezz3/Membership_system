<template> 
    <h1>Member</h1>
    <Button @click="get_member">
        <span>Get Member</span>
    </Button>
    <Button @click="show_add_member_dialog">
        <span>Add Member</span>
    </Button>

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
                    <template #body>
                        <Button>

                        <i class="pi pi-user-edit"></i>
                    </Button>
                    </template>
                </Column>
            </template>
        </DataTable>
    </div>

</template> 

<script src="@/scripts/Admin/AdminMember.js" />
<style src="@/css/Admin/AdminMember.css" />