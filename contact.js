let userID = 0
let contactID = 0
let contactDetailsID = 0
const allUsers = []

class User{
    constructor(firstName, lastName, roleOfUser){
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }
        if(typeof(roleOfUser)!='string'){
            console.log("Role of User passed is not a string")
            return
        }
        if(roleOfUser!='admin' && roleOfUser!='staff'){
            console.log("Role of User can be either admin or staff only")
            return
        }

        this.firstName = firstName
        this.lastName = lastName
        this.isActive = true
        this.userID = ++userID
        this.contacts = []

        this.isAdmin = false
        if(roleOfUser == 'admin'){
            this.isAdmin = true
        }
        allUsers.push(this)
    }

    createUser(firstName, lastName, roleOfUser){
        if(this.isAdmin == false){
            console.log("Only admin can create users")
            return
        }
        let newUser = new User(firstName, lastName, roleOfUser)
        return newUser
    }

    createContact(firstName, lastName, contactType, contactNumber){
        let newContact = new Contact(firstName, lastName)
        
        this.contacts.push(newContact)

        newContact.createContactDetails(contactType, contactNumber)
        return
    }

    addContactDetails(firstName, lastName, contactType, contactNumber){
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }
        
        let [isContactPresent, indexOfContactFound] = this.findContact(firstName,lastName)
        if(isContactPresent==false || this.contacts[indexOfContactFound].isActive==false){
            console.log("Contact does not exist")
            return
        }

        this.contacts[indexOfContactFound].createContactDetails(contactType, contactNumber)
    }

    createUserContact(userFirstName, userLastName, contactFirstName, contactLastName, contactType, contactNumber){
        if(this.isAdmin == false){
            console.log("Only admin can create other user's contact")
            return
        }
        if(typeof(userFirstName)!='string'){
            console.log("User First Name is not a string")
            return
        }
        if(typeof(userLastName)!='string'){
            console.log("User Last Name is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(userFirstName,userLastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].createContact(contactFirstName, contactLastName, contactType, contactNumber)
        return
    }

    addUserContactDetails(userFirstName, userLastName, contactFirstName, contactLastName, contactType, contactNumber){
        if(this.isAdmin == false){
            console.log("Only admin can add to other user's contact details")
            return
        }
        if(typeof(userFirstName)!='string'){
            console.log("User First Name is not a string")
            return
        }
        if(typeof(userLastName)!='string'){
            console.log("User Last Name is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(userFirstName,userLastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].addContactDetails(contactFirstName, contactLastName, contactType, contactNumber)
        return
    }

    displaySelf(){
        console.log("User Name :",this.firstName,this.lastName)
        for(let i in this.contacts){
            if(this.contacts[i].isActive==true){
                this.contacts[i].displayContact()
            }
        }
        return
    }

    displayUser(firstName, lastName){
        if(this.isAdmin == false){
            console.log("Only admin can display other users")
            return
        }
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(firstName, lastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].displaySelf()
        return
    }
    
    displayAllUsers(){
        if(this.isAdmin == false){
            console.log("Only admin can display all users")
            return
        }
        for(let i in allUsers){
            if(allUsers[i].isActive==true){
                allUsers[i].displaySelf()
            }
        }
    }

    updateFirstName(newFirstName){
        if(typeof(newFirstName)!='string'){
            console.log("New First Name passed is not a string")
            return
        }
        this.firstName = newFirstName
        return
    }

    updateLastName(newLastName){
        if(typeof(newLastName)!='string'){
            console.log("New Last Name passed is not a string")
            return
        }
        this.lastName = newLastName
        return
    }

    updateRoleOfUser(newRoleOfUser){
        if(typeof(newRoleOfUser)!='string'){
            console.log("Role of User passed is not a string")
            return
        }
        if(newRoleOfUser!='admin' && newRoleOfUser!='staff'){
            console.log("Role of User can be either admin or staff only")
            return
        }

        if(newRoleOfUser == 'admin'){
            this.isAdmin = true
        }
        else{
            this.isAdmin = false
        }
        return
    }

    updateSelf(updateDetail, updateValue){
        switch(updateDetail){
            case "firstName":
                this.updateFirstName(updateValue)
                break
            case "lastName":
                this.updateLastName(updateValue)
                break
            case "roleOfUser":
                this.updateRoleOfUser(updateValue)
                break
            default:
                console.log("User Detail does not exist")
        }
        return
    }

    updateSelfContact(firstName, lastName, updateDetail, updateValue){
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }

        let [isContactPresent, indexOfContactFound] = this.findContact(firstName,lastName)
        if(isContactPresent==false || this.contacts[indexOfContactFound].isActive==false){
            console.log("Contact does not exist")
            return
        }

        this.contacts[indexOfContactFound].updateContact(updateDetail, updateValue)
        return
    }

    updateSelfContactDetails(firstName, lastName, contactType, updateDetail, updateValue){
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }

        let [isContactPresent, indexOfContactFound] = this.findContact(firstName,lastName)
        if(isContactPresent==false || this.contacts[indexOfContactFound].isActive==false){
            console.log("Contact does not exist")
            return
        }

        this.contacts[indexOfContactFound].updateContactDetails(contactType, updateDetail, updateValue)
        return
    }

    updateUser(firstName, lastName, updateDetail, updateValue){
        if(this.isAdmin == false){
            console.log("Only admin can update other users")
            return
        }
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(firstName, lastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].updateSelf(updateDetail,updateValue)
        return
    }

    updateUserContact(userFirstName, userLastName, contactFirstName, contactLastName, updateDetail, updateValue){
        if(this.isAdmin == false){
            console.log("Only admin can update other user's contact")
            return
        }
        if(typeof(userFirstName)!='string'){
            console.log("User First Name is not a string")
            return
        }
        if(typeof(userLastName)!='string'){
            console.log("User Last Name is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(userFirstName,userLastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].updateSelfContact(contactFirstName, contactLastName, updateDetail, updateValue)
        return
    }

    updateUserContactDetails(userFirstName, userLastName, contactFirstName, contactLastName, contactType, updateDetail, updateValue){
        if(this.isAdmin == false){
            console.log("Only admin can update other user's contact details")
            return
        }
        if(typeof(userFirstName)!='string'){
            console.log("User First Name is not a string")
            return
        }
        if(typeof(userLastName)!='string'){
            console.log("User Last Name is not a string")
            return
        }
        if(typeof(contactFirstName)!='string'){
            console.log("Contact First Name is not a string")
            return
        }
        if(typeof(contactLastName)!='string'){
            console.log("Contact Last Name is not a string")
            return
        }

        let [isUserPresent, indexOfUserFound] = findUser(userFirstName,userLastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].updateSelfContactDetails(contactFirstName, contactLastName, contactType, updateDetail, updateValue)
        return
    }

    findContact(firstName, lastName){
        let isContactPresent = false
        let indexOfContactFound = -1
        for(let i in this.contacts){
            if(this.contacts[i].firstName == firstName && this.contacts[i].lastName == lastName){
                isContactPresent = true
                indexOfContactFound = i
                break
            }
        }
        return [isContactPresent,indexOfContactFound]
    }

    deleteSelf(){
        this.isActive = false
        return
    }

    deleteUser(firstName, lastName){
        if(this.isAdmin == false){
            console.log("Only admin can delete other users")
            return
        }
        if(typeof(firstName)!='string'){
            console.log("First Name is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name is not a string")
            return
        }
        
        let [isUserPresent, indexOfUserFound] = findUser(firstName, lastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].deleteSelf()
        return
    }

    deleteSelfContact(firstName, lastName){
        if(typeof(firstName)!='string'){
            console.log("Contact First Name is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Contact Last Name is not a string")
            return
        }

        let [isContactPresent, indexOfContactFound] = this.findContact(firstName, lastName)
        if(isContactPresent==false || this.contacts[indexOfContactFound].isActive==false){
            console.log("Contact does not exist")
            return
        }

        this.contacts[indexOfContactFound].deleteContact()
        return
    }

    deleteUserContact(userFirstName, userLastName, contactFirstName, contactLastName){
        if(this.isAdmin == false){
            console.log("Only admin can delete other user's contact")
            return
        }
        if(typeof(userFirstName)!='string'){
            console.log("User First Name is not a string")
            return
        }
        if(typeof(userLastName)!='string'){
            console.log("User Last Name is not a string")
            return
        }
        
        let [isUserPresent, indexOfUserFound] = findUser(userFirstName, userLastName)
        if(isUserPresent==false || allUsers[indexOfUserFound].isActive==false){
            console.log("User does not exist")
            return
        }

        allUsers[indexOfUserFound].deleteSelfContact(contactFirstName, contactLastName)
        return
    }
}

function findUser(firstName, lastName){
    let isUserPresent = false
    let indexOfUserFound = -1
    for(let i in allUsers){
        if(allUsers[i].firstName == firstName && allUsers[i].lastName == lastName){
            isUserPresent = true
            indexOfUserFound = i
            break
        }
    }
    return [isUserPresent,indexOfUserFound]
}

class Contact{
    constructor(firstName, lastName){
        if(typeof(firstName)!='string'){
            console.log("First Name passed is not a string")
            return
        }
        if(typeof(lastName)!='string'){
            console.log("Last Name passed is not a string")
            return
        }

        this.firstName = firstName
        this.lastName = lastName
        this.isActive = true
        this.contactDetails = []
        this.contactID = ++contactID
    }

    createContactDetails(contactType, contactNumber){
        let newContactDetails = new ContactDetails(contactType, contactNumber)
        this.contactDetails.push(newContactDetails)
        return
    }

    displayContact(){
        console.log("   Contact Name :",this.firstName,this.lastName)
        for(let i in this.contactDetails){
            if(this.isActive==true){
                this.contactDetails[i].displayContactDetails()
            }
        }
    }

    updateFirstName(newFirstName){
        if(typeof(newFirstName)!='string'){
            console.log("New First Name passed is not a string")
            return
        }
        this.firstName = newFirstName
        return
    }

    updateLastName(newLastName){
        if(typeof(newLastName)!='string'){
            console.log("New Last Name passed is not a string")
            return
        }
        this.lastName = newLastName
        return
    }

    updateContact(updateDetail, updateValue){
        switch(updateDetail){
            case "firstName":
                this.updateFirstName(updateValue)
                break
            case "lastName":
                this.updateLastName(updateValue)
                break
            default:
                console.log("User Detail does not exist")
        }
        return
    }

    updateContactDetails(contactType, updateDetail, updateValue){
        let [isContactDetailsPresent, indexOfContactDetailsFound] = this.findContactDetails(contactType)
        if(isContactDetailsPresent==false){
            console.log("Contact Detail does not exist")
            return
        }
        this.contactDetails[indexOfContactDetailsFound].updateContactDetails(updateDetail, updateValue)
        return
    }

    findContactDetails(contactType){
        let isContactDetailsPresent = false
        let indexOfContactDetailsFound = -1
        for(let i in this.contactDetails){
            if(this.contactDetails[i].contactType == contactType){
                isContactDetailsPresent = true
                indexOfContactDetailsFound = i
                break
            }
        }
        return [isContactDetailsPresent,indexOfContactDetailsFound]
    }

    deleteContact(){
        this.isActive = false
    }
}

class ContactDetails{
    constructor(contactType, contactNumber){
        if(typeof(contactType)!='string'){
            console.log("Contact Type passed is not a string")
            return
        }
        if(typeof(contactNumber)!='number'){
            console.log("Contact Number passed is not a number")
            return
        }

        this.contactType = contactType
        this.contactNumber = contactNumber
        this.contactDetailsID = ++contactDetailsID
    }

    displayContactDetails(){
        console.log("       Contact Type :",this.contactType)
        console.log("       Contact Number :",this.contactNumber)
        return
    }

    updateContactType(newContactType){
        if(typeof(newContactType)!='string'){
            console.log("Contact Type passed is not a string")
            return
        }
        this.contactType = newContactType
        return
    }
    updateContactNumber(newContactNumber){
        if(typeof(newContactNumber)!='number'){
            console.log("Contact Number passed is not a number")
            return
        }
        this.contactNumber = newContactNumber
        return
    }
    updateContactDetails(updateDetail, updateValue){
        switch(updateDetail){
            case "contactType":
                this.updateContactType(updateValue)
                break
            case "contactNumber":
                this.updateContactNumber(updateValue)
                break
            default:
                console.log("User Detail does not exist")
        }
        return
    }
}

let aryan = new User('aryan', 'mahobe', 'admin')
let name1 = new User('fname1', 'lname1', 'staff')
let name2 = new User('fname2', 'lname2', 'guest')

aryan.createContact('fname3', 'lname3', 'home', 1234)
aryan.addContactDetails('fname3', 'lname3', 'work', 5678)

name1.createContact('fname4', 'lname4', 'home', 2222)
name1.addContactDetails('fname4', 'lname4', 'work', 3333)

aryan.createUser('fname5', 'lname5', 'staff')

name1.createUser('fname6', 'lname6')

aryan.deleteSelfContact('fname3', 'lname3')
aryan.deleteUser('fname1', 'lname1')

aryan.createUserContact('fname5', 'lname5', 'fname7', 'lname7', 'home', 1111)
aryan.addUserContactDetails('fname5', 'lname5', 'fname7', 'lname7', 'work', 4444)

let name8 = new User('fname8', 'lname8', 'staff')
let name9 = new User('fname9', 'lname9', 'staff')

name8.createContact('fname10', 'lname10', 'home', 5555)
name8.addContactDetails('fname10', 'lname10', 'work', 6666)

name9.createContact('fname11', 'lname11', 'home', 7777)
name9.addContactDetails('fname11', 'lname11', 'work', 8888)

aryan.displayUser('fname9', 'lname9')
name8.displayUser('fname9', 'lname9')
name8.displaySelf()

name8.updateSelf('firstName', 'fname88')
name8.updateSelf('lastName', 'lname88')

name8.updateSelfContact('fname10', 'lname10', 'firstName', 'fname100')
name8.updateSelfContact('fname100', 'lname10', 'lastName', 'lname100')

name8.updateSelfContactDetails('fname100', 'lname100', 'home', 'contactType', 'home2')
name8.updateSelfContactDetails('fname100', 'lname100', 'home2', 'contactNumber', 4321)

name8.updateUser('fname9', 'lname9', 'firstName', 'fname99')
name8.updateUserContact('fname99', 'lname99', 'fname11', 'lname11', 'firstName', 'fname111')
name8.updateUserContactDetails('fname99', 'lname99', 'fname111', 'lname111', 'home', 'contactType', 'home2')

aryan.updateUser('fname9', 'lname9', 'firstName', 'fname99')
aryan.updateUser('fname99', 'lname9', 'lastName', 'lname99')

aryan.updateUserContact('fname99', 'lname99', 'fname11', 'lname11', 'firstName', 'fname111')
aryan.updateUserContact('fname99', 'lname99', 'fname111', 'lname11', 'lastName', 'lname111')

aryan.updateUserContactDetails('fname99', 'lname99', 'fname111', 'lname111', 'home', 'contactType', 'home2')
aryan.updateUserContactDetails('fname99', 'lname99', 'fname111', 'lname111', 'home2', 'contactNumber', 8765)

name8.deleteSelf()
name9.deleteSelfContact('fname111', 'lname111')

let name12 = new User('fname12', 'lname12', 'staff')
name12.createContact('fname13', 'lname13', 'home', 1122)
name12.addContactDetails('fname13', 'lname13', 'work', 2233)

name12.deleteUser('fname99', 'lname99')
name9.deleteUserContact('fname12', 'lname12', 'fname13', 'lname13')

aryan.deleteUser('fname99', 'lname99')
aryan.deleteUserContact('fname12', 'lname12', 'fname13', 'lname13')

aryan.displayAllUsers()
name8.displayAllUsers()